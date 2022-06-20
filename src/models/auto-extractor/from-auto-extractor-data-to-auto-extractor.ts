/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { AutoExtractor } from './auto-extractor';
import { AutoExtractorData } from './auto-extractor-data';

export const AutoExtractorDataToAutoExtractor = (data: AutoExtractorData): AutoExtractor => ({
	...data,
	_tag: 'AutoExtractor',
});
