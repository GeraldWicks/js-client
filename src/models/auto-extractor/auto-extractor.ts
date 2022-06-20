/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { AutoExtractorData } from './auto-extractor-data';
import { RawAutoExtractorModule } from './raw-auto-extractor';

export interface AutoExtractor extends AutoExtractorData {
	_tag: 'AutoExtractor';
}

export type AutoExtractorModule = RawAutoExtractorModule;
