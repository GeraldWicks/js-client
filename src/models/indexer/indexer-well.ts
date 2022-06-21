/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isString, isUndefined } from 'lodash';
import { isUUID } from '~/value-objects';
import { IndexerWellData } from './indexer-well-data';
import { isReplicatedState } from './replicated-state';
import { isWell } from './well';

/** An indexer's well. */
export interface IndexerWell extends IndexerWellData {
	_tag: 'IndexerWell';
}

export const isIndexerWell = (value: unknown): value is IndexerWell => {
	try {
		const i = <IndexerWell>value;

		return (
			isUUID(i.uuid) &&
			isString(i.name) &&
			i.wells.every(isWell) &&
			(isUndefined(i.replicated) ||
				Object.entries(i.replicated).every(([k, v]) => isString(k) && v.every(isReplicatedState)))
		);
	} catch {
		return false;
	}
};
