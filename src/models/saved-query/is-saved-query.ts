/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isSavedQueryData } from './is-saved-query-data';
import { SavedQuery } from './saved-query';
import { DATA_TYPE } from '~/models';

export const isSavedQuery = (value: unknown): value is SavedQuery => {
	try {
		const q = <SavedQuery>value;
		return q._tag === DATA_TYPE.SAVED_QUERY && isSavedQueryData(q);
	} catch {
		return false;
	}
};
