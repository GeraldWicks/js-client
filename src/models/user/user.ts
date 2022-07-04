/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { UserData } from './user-data';
import { DATA_TYPE } from '~/models';

export interface User extends UserData {
	_tag: DATA_TYPE.USER;
}

export type UserRole = User['role'];
