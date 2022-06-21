/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { IndexerWell } from './indexer-well';
import { IndexerWellData } from './indexer-well-data';

export const fromIndexerWellDataToIndexerWell = (data: IndexerWellData): IndexerWell => ({
	...data,
	_tag: 'IndexerWell',
});
