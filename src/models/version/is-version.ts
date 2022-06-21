/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isVersionData } from './is-version-data';
import { Version } from './version';

export const isVersion = (value: any): value is Version => {
	try {
		const v = <Version>value;
		return v._tag === 'Version' && isVersionData(v);
	} catch {
		return false;
	}
};
