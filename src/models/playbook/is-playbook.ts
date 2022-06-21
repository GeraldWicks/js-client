/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isPlaybookData } from './is-playbook.data';
import { Playbook } from './playbook';

export const isPlaybook = (value: any): value is Playbook => {
	try {
		const p = <Playbook>value;
		return p._tag === 'Playbook' && isPlaybookData(p);
	} catch {
		return false;
	}
};
