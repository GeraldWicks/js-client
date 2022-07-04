/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Playbook } from './playbook';
import { PlaybookData } from './playbook-data';
import { DATA_TYPE } from '~/models';

export const fromPlaybookDataToPlaybook = (data: PlaybookData): Playbook => ({
	...data,
	_tag: DATA_TYPE.PLAYBOOK,
});
