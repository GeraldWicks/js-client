
    /*************************************************************************
* Copyright 2022 Gravwell, Inc. All rights reserved.
* Contact: <legal@gravwell.io>
*
* This software may be modified and distributed under the terms of the
* MIT license. See the LICENSE file for details.
**************************************************************************/

    export const fromMail-serverDataToMail-server = (data: Mail-serverData): Mail-server => ({
        ...data,
        _tag: 'Mail-server',
    });
    