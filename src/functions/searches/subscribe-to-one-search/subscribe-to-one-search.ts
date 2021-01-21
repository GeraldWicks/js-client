/*************************************************************************
 * Copyright 2020 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isEqual, isNull, isUndefined } from 'lodash';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { bufferCount, distinctUntilChanged, filter, first, map, startWith } from 'rxjs/operators';
import {
	Query,
	RawAcceptSearchMessageSent,
	RawInitiateSearchMessageSent,
	RawRequestSearchEntriesWithinRangeMessageSent,
	RawResponseForSearchDetailsMessageReceived,
	RawResponseForSearchStatsMessageReceived,
	RawSearchInitiatedMessageReceived,
	RawSearchMessageReceivedRequestEntriesWithinRange,
	SearchFilter,
	SearchMessageCommands,
	SearchStats,
	SearchSubscription,
	toSearchEntries,
} from '../../../models';
import { Percentage, toNumericID } from '../../../value-objects';
import { APIContext, promiseProgrammatically } from '../../utils';
import { makeSubscribeToOneRawSearch } from './subscribe-to-one-raw-search';

type RequiredSearchFilter = Required<
	Omit<SearchFilter, 'dateRange'> & { dateRange: Required<NonNullable<SearchFilter['dateRange']>> }
>;

export const makeSubscribeToOneSearch = (context: APIContext) => {
	const subscribeToOneRawSearch = makeSubscribeToOneRawSearch(context);
	let rawSubscriptionP: ReturnType<typeof subscribeToOneRawSearch> | null = null;

	return async (
		query: Query,
		range: [Date, Date],
		options: { filter?: SearchFilter } = {},
	): Promise<SearchSubscription> => {
		if (isNull(rawSubscriptionP)) rawSubscriptionP = subscribeToOneRawSearch();
		const rawSubscription = await rawSubscriptionP;
		const initialFilter = {
			entriesOffset: {
				index: options.filter?.entriesOffset?.index ?? 0,
				count: options.filter?.entriesOffset?.count ?? 100,
			},
			dateRange: {
				start: options.filter?.dateRange?.start ?? range[0],
				end: options.filter?.dateRange?.end ?? range[1],
			},
			// TODO(wisely): IDK what should be the default value here
			desiredGranularity: options.filter?.desiredGranularity ?? 100,
			fieldFilters: options.filter?.fieldFilters ?? [],
		};

		const searchTypeIDP = promiseProgrammatically<string>();
		rawSubscription.received$
			.pipe(
				filter((msg): msg is RawSearchInitiatedMessageReceived => {
					try {
						const _msg = <RawSearchInitiatedMessageReceived>msg;
						return _msg.type === 'search' && _msg.data.RawQuery === query;
					} catch {
						return false;
					}
				}),
				first(),
			)
			.subscribe(
				msg => {
					searchTypeIDP.resolve(msg.data.OutputSearchSubproto);
					rawSubscription.send(<RawAcceptSearchMessageSent>{
						type: 'search',
						data: { OK: true, OutputSearchSubproto: msg.data.OutputSearchSubproto },
					});
				},
				err => searchTypeIDP.reject(err),
			);

		rawSubscription.send(<RawInitiateSearchMessageSent>{
			type: 'search',
			data: {
				Background: false,
				Metadata: {} as any,
				SearchStart: range[0].toISOString(),
				SearchEnd: range[1].toISOString(),
				SearchString: query,
			},
		});

		const searchTypeID = await searchTypeIDP.promise;
		const searchMessages$ = rawSubscription.received$.pipe(filter(msg => msg.type === searchTypeID));

		const progress$: Observable<Percentage> = searchMessages$.pipe(
			map(msg => (msg as Partial<RawResponseForSearchDetailsMessageReceived>).data?.Finished ?? null),
			filter(isBoolean),
			map(done => (done ? 1 : 0)),
			distinctUntilChanged(),
			map(rawPercentage => new Percentage(rawPercentage)),
		);

		const entries$ = searchMessages$.pipe(
			filter((msg): msg is RawSearchMessageReceivedRequestEntriesWithinRange => {
				try {
					const _msg = <RawSearchMessageReceivedRequestEntriesWithinRange>msg;
					return _msg.data.ID === SearchMessageCommands.RequestEntriesWithinRange;
				} catch {
					return false;
				}
			}),
			map(msg => toSearchEntries(msg)),
		);

		const _filter$ = new BehaviorSubject<SearchFilter>(initialFilter);
		const setFilter = (filter: SearchFilter) => {
			_filter$.next(filter);
		};
		const filter$ = _filter$.asObservable().pipe(
			startWith<SearchFilter>(initialFilter),
			bufferCount(2, 1),
			map(
				([prev, curr]): RequiredSearchFilter => ({
					entriesOffset: {
						index: curr.entriesOffset?.index ?? prev.entriesOffset?.index ?? initialFilter.entriesOffset.index,
						count: curr.entriesOffset?.count ?? prev.entriesOffset?.count ?? initialFilter.entriesOffset.count,
					},
					dateRange: {
						start: curr.dateRange?.start ?? prev.dateRange?.start ?? initialFilter.dateRange.start,
						end: curr.dateRange?.end ?? prev.dateRange?.end ?? initialFilter.dateRange.end,
					},
					desiredGranularity: curr.desiredGranularity ?? prev.desiredGranularity ?? initialFilter.desiredGranularity,
					fieldFilters: curr.fieldFilters ?? prev.fieldFilters ?? initialFilter.fieldFilters,
				}),
			),
			distinctUntilChanged((a, b) => isEqual(a, b)),
		);

		const requestEntries = async (filter: RequiredSearchFilter): Promise<void> => {
			const first = filter.entriesOffset.index * filter.entriesOffset.count;
			const last = first + filter.entriesOffset.count;
			const start = filter.dateRange.start;
			const end = filter.dateRange.end;
			// TODO: Filter by .desiredGranularity and .fieldFilters

			await rawSubscription.send(<RawRequestSearchEntriesWithinRangeMessageSent>{
				type: searchTypeID,
				data: {
					ID: SearchMessageCommands.RequestEntriesWithinRange,
					Addendum: {},
					EntryRange: {
						First: first,
						Last: last,
						StartTS: start.toISOString(),
						EndTS: end.toISOString(),
					},
				},
			});
		};

		filter$.subscribe(filter => {
			requestEntries(filter);
			setTimeout(() => requestEntries(filter), 2000); // TODO: Change this
		});

		const rawSearchStats$ = searchMessages$.pipe(
			filter((msg): msg is RawResponseForSearchStatsMessageReceived => {
				try {
					const _msg = <RawResponseForSearchStatsMessageReceived>msg;
					return _msg.data.ID === SearchMessageCommands.RequestAllStats;
				} catch {
					return false;
				}
			}),
		);

		const rawSearchDetails$ = searchMessages$.pipe(
			filter((msg): msg is RawResponseForSearchDetailsMessageReceived => {
				try {
					const _msg = <RawResponseForSearchDetailsMessageReceived>msg;
					return _msg.data.ID === SearchMessageCommands.RequestDetails;
				} catch {
					return false;
				}
			}),
		);

		const stats$ = combineLatest(rawSearchStats$, rawSearchDetails$).pipe(
			map(
				([rawStats, rawDetails]): SearchStats => ({
					id: rawDetails.data.SearchInfo.ID,
					userID: toNumericID(rawDetails.data.SearchInfo.UID),

					entries: rawStats.data.EntryCount,
					duration: rawDetails.data.SearchInfo.Duration,
					start: new Date(rawDetails.data.SearchInfo.StartRange),
					end: new Date(rawDetails.data.SearchInfo.EndRange),

					storeSize: rawDetails.data.SearchInfo.StoreSize,
					processed: {
						entries: 0, // ?QUESTION: How to calculate that?
						bytes: 0, // ?QUESTION: How to calculate that?
					},

					pipeline: rawStats.data.Stats.Set.map(s => s.Stats)
						.reduce<
							Array<Array<RawResponseForSearchStatsMessageReceived['data']['Stats']['Set'][number]['Stats'][number]>>
						>((acc, curr) => {
							curr.forEach((_curr, i) => {
								if (isUndefined(acc[i])) acc[i] = [];
								acc[i].push(_curr);
							});
							return acc;
						}, [])
						.map(s =>
							s
								.map(_s => ({
									module: _s.Name,
									arguments: _s.Args,
									duration: _s.Duration,
									input: {
										bytes: _s.InputBytes,
										entries: _s.InputCount,
									},
									output: {
										bytes: _s.OutputBytes,
										entries: _s.OutputCount,
									},
								}))
								.reduce((acc, curr) => ({
									...curr,
									duration: acc.duration + curr.duration,
									input: {
										bytes: acc.input.bytes + curr.input.bytes,
										entries: acc.input.entries + curr.input.entries,
									},
									output: {
										bytes: acc.output.bytes + curr.output.bytes,
										entries: acc.output.entries + curr.output.entries,
									},
								})),
						),
				}),
			),
		);

		return { progress$, entries$, stats$, setFilter };
	};
};
