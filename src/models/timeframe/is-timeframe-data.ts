/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isDate, isNull, isString } from 'lodash';
import { TimeframeData } from './timeframe-data';

export const isTimeframeData = (value: unknown): value is TimeframeData => {
	try {
		const tf = <TimeframeData>value;
		return (
			(isString(tf.durationString) || isNull(tf.durationString)) &&
			(isString(tf.timeframe) || isNull(tf.timeframe)) &&
			(isString(tf.timezone) || isNull(tf.timezone)) &&
			(isDate(tf.start) || isNull(tf.start)) &&
			(isDate(tf.end) || isNull(tf.end))
		);
	} catch {
		return false;
	}
};