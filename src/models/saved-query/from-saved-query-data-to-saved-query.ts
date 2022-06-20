
    /*************************************************************************
* Copyright 2022 Gravwell, Inc. All rights reserved.
* Contact: <legal@gravwell.io>
*
* This software may be modified and distributed under the terms of the
* MIT license. See the LICENSE file for details.
**************************************************************************/

    export const fromSaved-queryDataToSaved-query = (data: Saved-queryData): Saved-query => ({
        ...data,
        _tag: 'Saved-query',
    });
    