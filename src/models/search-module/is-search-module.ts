/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { SearchModule } from './search-module';

export const isSearchModule = (value: unknown): value is SearchModule => {
	try {
		const m = <SearchModule>value;
		return m._tag === 'SearchModule' && isSearchModule(m);
	} catch {
		return false;
	}
};
