/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Dashboard } from '~/models';
import { isDashboardData } from './is-dashboard-data';
import { DATA_TYPE } from '~/models';

export const isDashboard = (value: unknown): value is Dashboard => {
	try {
		const d = <Dashboard>value;
		return d._tag === DATA_TYPE.DASHBOARD && isDashboardData(d);
	} catch {
		return false;
	}
};
