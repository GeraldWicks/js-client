/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { ReplicatedState } from './replicated-state';
import { Well } from './well';

export type IndexerWellData = {
	name: string;
	uuid: string;
	wells: Array<Well>;
	replicated?: Record<string, Array<ReplicatedState>>;
};
