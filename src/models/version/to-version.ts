/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isNumber, isString } from 'lodash';
import { RawVersion } from './raw-version';
import { RawVersionObject } from './raw-version-object';
import { Version } from './version';

export const toVersion = (raw: RawVersion | RawVersionObject | number): Version => {
	if (isString(raw) || isNumber(raw)) {
		const [major, minor, patch] = raw
			.toString()
			.split('.')
			.map(s => parseInt(s, 10))
			.concat([0, 0, 0]);
		return { _tag: 'Version', major, minor, patch };
	} else {
		return { _tag: 'Version', major: raw.Major, minor: raw.Minor ?? 0, patch: raw.Point ?? 0 };
	}
};
