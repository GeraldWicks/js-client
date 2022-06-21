/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isNumber, isPlainObject, isString } from 'lodash';
import { isOfTypeOrNil } from './is-mail-server-config';
import { MailServerConfigData } from './mail-server-config-data';

export const isMailServerConfigData = (v: any): v is MailServerConfigData => {
	if (isPlainObject(v)) {
		return (
			isOfTypeOrNil(v.server, isString) &&
			isOfTypeOrNil(v.password, isString) &&
			isOfTypeOrNil(v.string, isString) &&
			isOfTypeOrNil(v.port, isNumber) &&
			isOfTypeOrNil(v.useTLS, isBoolean) &&
			isOfTypeOrNil(v.insecureSkipVerify, isBoolean)
		);
	}
	return false;
};
