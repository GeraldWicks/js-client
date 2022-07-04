/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RenderModuleData } from './render-module-data';
import { DATA_TYPE } from '~/models';

export interface RenderModule extends RenderModuleData {
	_tag: DATA_TYPE.RENDER_MODULE;
}
