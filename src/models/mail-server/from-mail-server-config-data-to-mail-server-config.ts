/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { MailServerConfig } from './mail-server-config';
import { MailServerConfigData } from './mail-server-config-data';

export const fromMailServerConfigDataToMailServerConfig = (data: MailServerConfigData): MailServerConfig => ({
	...data,
	_tag: 'MailServerConfig',
});
