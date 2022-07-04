/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { KitArchive } from './kit-archive';
import { KitArchiveData } from './kit-archive-data';
import { DATA_TYPE } from '~/models';

export const fromKitArchiveDataToKitArchive = (data: KitArchiveData): KitArchive => ({
	...data,
	_tag: DATA_TYPE.KIT_ARCHIVE,
});
