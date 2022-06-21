/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { ScheduledScript } from './scheduled-script';
import { ScheduledScriptData } from './scheduled-script-data';

export const fromScheduledScriptDataToScheduledScript = (data: ScheduledScriptData): ScheduledScript => ({
	...data,
	_tag: 'ScheduledScript',
});
