/*************************************************************************
 * Copyright 2022 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { CreatableTemplate, isTemplate, Template } from '~/models';
import { integrationTest, TEST_BASE_API_CONTEXT } from '~/tests';
import { makeCreateOneTemplate } from './create-one-template';
import { makeDeleteOneTemplate } from './delete-one-template';

describe('createOneTemplate()', () => {
	const createOneTemplate = makeCreateOneTemplate(TEST_BASE_API_CONTEXT);
	const deleteOneTemplate = makeDeleteOneTemplate(TEST_BASE_API_CONTEXT);

	it(
		"Should create an template and return it's UUID",
		integrationTest(async () => {
			const data: CreatableTemplate = {
				userID: '1',
				groupIDs: [],
				name: 'Template test',
				query: 'tag=netflow __VAR__',
				variables: [{ label: 'Variable', name: '__VAR__', required: true }],
				labels: ['label'],
				isGlobal: false,
			};

			const template: Template = await createOneTemplate(data);
			expect(isTemplate(template)).toBeTrue();

			await deleteOneTemplate(template.id);
		}),
	);
});
