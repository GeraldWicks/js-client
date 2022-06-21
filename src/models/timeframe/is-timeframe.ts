/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isTimeframeData } from './is-timeframe-data';
import { Timeframe } from './timeframe';

export const isTimeframe = (value: unknown): value is Timeframe => {
	try {
		const tf = <Timeframe>value;
		return tf._tag === 'Timeframe' && isTimeframeData(tf);
	} catch {
		return false;
	}
};
