/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isRemoteKitData } from './is-remote-kit-data';
import { RemoteKit } from './remote-kit';
import { DATA_TYPE } from '~/models';

export const isRemoteKit = (v: any): v is RemoteKit => {
	try {
		const k = <RemoteKit>v;
		return k._tag === DATA_TYPE.REMOTE_KIT && isRemoteKitData(k);
	} catch {
		return false;
	}
};
