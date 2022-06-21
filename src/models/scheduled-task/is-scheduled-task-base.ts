/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isScheduledTaskBaseData } from './is-scheduled-task-base-data';
import { ScheduledTaskBase } from './scheduled-task-base';

export const isScheduledTaskBase = (value: any): value is ScheduledTaskBase => {
	try {
		const ss = <ScheduledTaskBase>value;
		return ss._tag === 'ScheduledTaskBase' && isScheduledTaskBaseData(ss);
	} catch {
		return false;
	}
};
