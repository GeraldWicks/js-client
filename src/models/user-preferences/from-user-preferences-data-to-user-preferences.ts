
    /*************************************************************************
* Copyright 2022 Gravwell, Inc. All rights reserved.
* Contact: <legal@gravwell.io>
*
* This software may be modified and distributed under the terms of the
* MIT license. See the LICENSE file for details.
**************************************************************************/

    export const fromUser-preferencesDataToUser-preferences = (data: User-preferencesData): User-preferences => ({
        ...data,
        _tag: 'User-preferences',
    });
    