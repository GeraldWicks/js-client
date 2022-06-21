/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isNil } from 'lodash';
import { isMailServerConfigData } from './is-mail-server-config-data';
import { MailServerConfig } from './mail-server-config';

export const isMailServerConfig = (value: any): value is MailServerConfig => {
	try {
		const v = <MailServerConfig>value;
		return v._tag === 'MailServerConfig' && isMailServerConfigData(v);
	} catch {
		return false;
	}
};

export const isOfTypeOrNil = (v: any, func: (value: any) => boolean): boolean => {
	return func(v) || isNil(v);
};
