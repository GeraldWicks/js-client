/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { SystemSettings } from './system-settings';
import { SystemSettingsData } from './system-settings-data';

export const fromSystemSettingsDataToSystemSettings = (data: SystemSettingsData): SystemSettings => ({
	...data,
	_tag: 'SystemSettings',
});
