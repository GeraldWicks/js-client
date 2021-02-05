/*************************************************************************
 * Copyright 2020 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawNumericID } from '~/value-objects';

export interface RawUpdatableFile {
	GUID?: string;

	GIDs: Array<RawNumericID>;
	Global: boolean;

	Name: string;
	Desc: string; // Use empty string for null
	Labels: Array<string>;
}
