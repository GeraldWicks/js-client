/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isBoolean, isDate, isNull, isString, isUndefined } from 'lodash';
import { isNumericID, isUUID } from '~/value-objects';
import { isTemplateVariable } from './is-template';
import { Template } from './template';

export const isTemplateData = (value: any): value is Template => {
	try {
		const t = <Template>value;
		return (
			isUUID(t.globalID) &&
			isUUID(t.id) &&
			isNumericID(t.userID) &&
			t.groupIDs.every(isNumericID) &&
			isString(t.name) &&
			(isString(t.description) || isNull(t.description)) &&
			t.labels.every(isString) &&
			isBoolean(t.isGlobal) &&
			isDate(t.lastUpdateDate) &&
			isString(t.query) &&
			t.variables.every(isTemplateVariable)
		);
	} catch {
		return false;
	}
};
