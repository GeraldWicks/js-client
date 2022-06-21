/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { ScheduledQueryData } from './scheduled-query-data';

export interface ScheduledQuery extends ScheduledQueryData {
	_tag: 'ScheduledQuery';
}
