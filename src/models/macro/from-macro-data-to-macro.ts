/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Macro } from './macro';
import { MacroData } from './macro-data';
import { DATA_TYPE } from '../data-type';

export const fromMacroDataToMacro = (data: MacroData): Macro => ({
	...data,
	_tag: DATA_TYPE.MACRO,
});
