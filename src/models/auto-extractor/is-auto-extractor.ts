/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { isString } from 'lodash';
import { DATA_TYPE } from '~/models';
import { AutoExtractor, AutoExtractorModule } from './auto-extractor';
import { AUTO_EXTRACTOR_MODULES } from './auto-extractor-modules';
import { isAutoExtractorData } from './is-auto-extractor-data';

export const isAutoExtractor = (value: unknown): value is AutoExtractor => {
	try {
		const ae = <AutoExtractor>value;
		return ae._tag === DATA_TYPE.AUTO_EXTRACTOR && isAutoExtractorData(ae);
	} catch {
		return false;
	}
};

const makeIsAutoExtractorModule = () => {
	const autoExtractorModulesSet = new Set(AUTO_EXTRACTOR_MODULES);

	return (value: unknown): value is AutoExtractorModule => {
		const m = <AutoExtractorModule>value;
		return isString(m) && autoExtractorModulesSet.has(m);
	};
};
export const isAutoExtractorModule = makeIsAutoExtractorModule();
