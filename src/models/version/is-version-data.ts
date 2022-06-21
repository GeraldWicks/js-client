/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isInteger } from 'lodash';
import { VersionData } from './version-data';

export const isVersionData = (value: unknown): value is VersionData => {
	try {
		const v = <VersionData>value;
		return isInteger(v.major) && isInteger(v.minor) && isInteger(v.patch);
	} catch {
		return false;
	}
};
