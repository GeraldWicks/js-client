/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isDate, isNull, isString } from 'lodash';
import { isNumericID } from '~/value-objects';
import { isValidUserData } from './is-valid-user-data';
import { User, UserRole } from './user';

export const isValidUserRole = (value: any): value is UserRole =>
	(<Array<UserRole>>['admin', 'analyst']).includes(value);

export const isValidUser = (value: any): value is User => {
	try {
		const u = <User>value;
		return u._tag === 'User' && isValidUserData(u);
	} catch {
		return false;
	}
};
