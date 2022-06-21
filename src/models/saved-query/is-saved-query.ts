/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isSavedQueryData } from './is-saved-query-data';
import { SavedQuery } from './saved-query';

export const isSavedQuery = (value: any): value is SavedQuery => {
	try {
		const q = <SavedQuery>value;
		return q._tag === 'SavedQuery' && isSavedQueryData(q);
	} catch {
		return false;
	}
};
