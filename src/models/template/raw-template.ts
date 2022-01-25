/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { RawNumericID, RawUUID } from '~/value-objects';

export interface RawTemplate {
	GUID: RawUUID;
	ThingUUID: RawUUID;

	UID: RawNumericID;
	GIDs: null | Array<RawNumericID>; // User IDs of group

	Global: boolean;
	Labels: null | Array<string>;

	Name: string;
	Description: string; // Empty string is null

	Updated: string; // Timestamp

	Contents: {
		query: string;
		variables: Array<RawTemplateVariable>;
	};
}

export type RawTemplateVariable = {
	name: string; // eg %%VAR%%
	label: string;
	description?: string; // Hint
	required?: boolean;
	defaultValue?: string;
	previewValue?: string | null;
};
