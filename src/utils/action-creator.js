// @flow

import type { DispatchAPI } from 'redux';

type Options = {
    dispatch: DispatchAPI<*>,
    action: () => Promise<*>,
    requestAction: string,
    requestPayload?: string | number | Object,
    successAction: string,
    failureAction: string,
    successResponseHandler?: () => any,
};

export default (options: Options): Promise<*> => {
    options.dispatch({
        type: options.requestAction,
        payload: options.requestPayload,
    });

    return new Promise((resolve, reject) => options.action().then(
        (response) => {
            let handledResponse;
            if (options.successResponseHandler instanceof Function) {
                handledResponse = options.successResponseHandler(response);
            }
            options.dispatch({
                type: options.successAction,
                payload: handledResponse || response,
            });
            resolve(handledResponse || response);
        },
        (error) => {
            options.dispatch({
                type: options.failureAction,
                payload: error,
            });
            reject(error);
        }
    ));
};
