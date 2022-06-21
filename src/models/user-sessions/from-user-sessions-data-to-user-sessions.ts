/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { UserSessions } from './user-sessions';
import { UserSessionsData } from './user-sessions-data';

export const fromUserSessionsDataToUserSessions = (data: UserSessionsData): UserSessions => ({
	...data,
	_tag: 'UserSessions',
});
