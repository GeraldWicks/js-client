/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isDate, isNull, isString } from 'lodash';
import { isNumericID } from '~/value-objects';
import { isValidUserRole } from './is-valid-user';
import { User } from './user';

export const isValidUserData = (value: any): value is User => {
	try {
		const u = <User>value;
		return (
			isNumericID(u.id) &&
			u.groupIDs.every(isNumericID) &&
			isString(u.username) &&
			isString(u.name) &&
			isString(u.email) &&
			isValidUserRole(u.role) &&
			isBoolean(u.locked) &&
			(isString(u.searchGroupID) || isNull(u.searchGroupID)) &&
			(isDate(u.lastActivityDate) || isNull(u.lastActivityDate))
		);
	} catch {
		return false;
	}
};
