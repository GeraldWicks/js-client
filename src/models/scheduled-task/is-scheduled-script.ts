/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isScheduledScriptData } from './is-scheduled-script-data';
import { ScheduledScript } from './scheduled-script';

export const isScheduledScript = (value: any): value is ScheduledScript => {
	try {
		const ss = <ScheduledScript>value;
		return isScheduledScriptData(ss) && ss._tag === 'ScheduledScript';
	} catch {
		return false;
	}
};
