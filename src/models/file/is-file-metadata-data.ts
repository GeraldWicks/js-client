/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { FileMetadata } from './file-metadata';

export const isFileMetadataData = (value: unknown): value is FileMetadata => {
	try {
		// TODO
		const f = <FileMetadata>value;
		return !!f;
	} catch {
		return false;
	}
};
