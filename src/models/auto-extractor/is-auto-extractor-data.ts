/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { AutoExtractorData } from './auto-extractor-data';

export const isAutoExtractorData = (value: unknown): value is AutoExtractorData => {
	try {
		const ae = <AutoExtractorData>value;
		return !!ae;
	} catch {
		return false;
	}
};
