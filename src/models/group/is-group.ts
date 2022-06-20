/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Group } from './group';
import { isGroupData } from './is-group-data';

export const isGroup = (value: any): value is Group => {
	try {
		const g = <Group>value;
		return g._tag === 'Group' && isGroupData(value);
	} catch {
		return false;
	}
};
