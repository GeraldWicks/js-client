/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isSystemSettingsData } from './is-system-settings-data';
import { SystemSettings } from './system-settings';

export const isSystemSettings = (value: unknown): value is SystemSettings => {
	try {
		const s = <SystemSettings>value;
		return s._tag === 'SystemSettings' && isSystemSettingsData(s);
	} catch {
		return false;
	}
};
