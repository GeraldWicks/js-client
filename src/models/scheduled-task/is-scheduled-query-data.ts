/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isNumber, isString } from 'lodash';
import { isScheduledTaskBase } from './is-scheduled-task-base';
import { ScheduledQueryData } from './scheduled-query-data';

export const isScheduledQueryData = (value: unknown): value is ScheduledQueryData => {
	try {
		const sq = <ScheduledQueryData>value;
		return (
			isScheduledTaskBase(sq) &&
			sq.type === 'query' &&
			isString(sq.query) &&
			(isNumber(sq.searchSince.secondsAgo) || isBoolean(sq.searchSince.lastRun))
		);
	} catch {
		return false;
	}
};
