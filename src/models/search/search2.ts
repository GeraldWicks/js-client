/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { PersistentSearchData } from './persistent-search-data';
import { DATA_TYPE } from '../data-type';

export interface Search2 extends PersistentSearchData {
	_tag: DATA_TYPE.PERSISTENT_SEARCH;
}
