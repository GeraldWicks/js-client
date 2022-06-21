/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isString } from 'lodash';
import { SearchModule } from './search-module';

export const isSearchModule = (value: any): value is SearchModule => {
	try {
		const m = <SearchModule>value;
		return m._tag === 'SearchModule' && isSearchModule(m);
	} catch {
		return false;
	}
};
