/*************************************************************************
 * Copyright 2021 Gravwell, Inc. All rights reserved.
 * Contact: <legal@gravwell.io>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { APIContext, fetch } from '~/functions/utils';
import { getEnvVar } from './get-env-var';

export * from './paths';

export const TEST_HOST = getEnvVar('TEST_HOST') ?? 'localhost:8080';

export const TEST_AUTH_TOKEN = getEnvVar('TEST_AUTH_TOKEN') ?? null;

export const TEST_BASE_API_CONTEXT: APIContext = {
	host: TEST_HOST,
	useEncryption: false,
	authToken:
		'7b22616c676f223a36323733382c22747970223a226a7774227d.7b22756964223a312c2265787069726573223a22323032322d30312d32365431383a31343a32302e3237373533353038335a222c22696174223a5b3137332c39382c3230382c35362c3233372c3134312c392c37392c31312c38392c3234392c36322c35342c3230312c3135332c3133342c3136302c3139352c3136392c32312c34342c3135372c34392c39362c37382c33342c3135332c31322c3233332c33352c3136372c3132365d7d.d662c3cef2bf2f5887590d2eed62c64e5db86591ce67cdb01fd9792ac80d7e49e19be62e28543cb9c760b337ecd862a77c791038dc58195d879c607011226f70',
	fetch: fetch,
};

const getBooleanEnv = (envVar: string): boolean | null => {
	const envValue = getEnvVar(envVar);
	if (envValue === undefined) return null;
	const validValues = ['true', 'false'];
	if (!validValues.includes(envValue)) throw Error(`Environment variable $${envVar}="${envValue}" should be a boolean`);
	return envValue === 'true';
};

export type TestType = 'unit' | 'integration';
export const TEST_TYPES = ((): Array<TestType> => {
	const integrationTestsEnv = getBooleanEnv('INTEGRATION_TESTS') ?? true;
	const unitTestsEnv = getBooleanEnv('UNIT_TESTS') ?? true;

	const testTypes: Array<TestType> = [];
	if (unitTestsEnv) testTypes.push('unit');
	if (integrationTestsEnv) testTypes.push('integration');
	return testTypes;
})();
