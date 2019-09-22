// @flow

import type {
    ErrorObject,
    RequestType,
    RequestParams,
    KeyValue,
} from '../types';

import { makeError } from './common';

type BodyContentType = 'multipart' | 'json';

type RequestProps = {
    url: string,
    args?: RequestParams,
    headers?: RequestParams,
    contentType?: BodyContentType
};

function tryResolve(
    responseText: string,
    resolve: * => void
): void {
    try {
        const jsonResult = JSON.parse(responseText);
        resolve(jsonResult);
    } catch (e) {
        resolve(responseText);
    }
}

function tryReject(
    responseText: string,
    reject: ErrorObject => void
): void {
    try {
        reject(JSON.parse(responseText));
    } catch (e) {
        reject(makeError('parse_error', String(e)));
    }
}

function makeRequest<T>( // eslint-disable-line
    resolve: * => void,
    reject: ErrorObject => void,
    method: RequestType,
    url: string,
    args?: RequestParams = {},
    headers?: RequestParams = {},
    contentType: BodyContentType
): void {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    const mappedArgs: KeyValue[] = Object
        .getOwnPropertyNames(args)
        .map((key: string): KeyValue => ({ key, value: args[key] }));

    let data: FormData | null = null;
    let requestURL: string = url;

    if (/^(POST|PUT)$/.test(method)) {
        data = mappedArgs.reduce((form: FormData, entry: KeyValue) => {
            form.append(entry.key, entry.value);
            return form;
        }, new FormData());
    } else if (mappedArgs.length > 0) {
        const mappedArgsString = mappedArgs
            .map((entry: KeyValue) => (
                `${encodeURIComponent(entry.key)}=${encodeURIComponent(entry.value)}`
            ))
            .join('&');

        requestURL += `?${mappedArgsString}`;
    }

    xhr.open(method, requestURL, true);
    xhr.addEventListener('load', (e: { target: * }) => { // TODO add type
        const target: XMLHttpRequest = e.target;
        const readOnlyArray: $ReadOnlyArray<*> = [];
        switch (target.status) {
            case 204:
                resolve(readOnlyArray);
                break;
            case 200:
                tryResolve(target.responseText, resolve);
                break;
            case 201:
                makeRequest(
                    resolve,
                    reject,
                    'GET',
                    target.getResponseHeader('Location'),
                    args,
                    headers,
                    'multipart'
                );
                break;
            default:
                tryReject(target.responseText, reject);
                break;
        }
    });

    xhr.addEventListener('error', () => {
        reject(makeError('network_error', `Unable to ${method} ${url}`));
    });

    Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key]);
    });

    if (contentType === 'multipart') {
        xhr.send(data);
    } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(args));
    }
}

function http<T>(
    method: RequestType,
    url: string,
    args: RequestParams = {},
    headers: RequestParams = {},
    contentType: BodyContentType = 'multipart'
): Promise<T> {
    return new Promise(
        (resolve, reject) => makeRequest(resolve, reject, method, url, args, headers, contentType)
    );
}

// ----------------
// public methods
// ----------------

function get<T>(props: RequestProps): Promise<T> {
    return http('GET', props.url, props.args, props.headers);
}

function post<T>(props: RequestProps): Promise<T> {
    return http('POST', props.url, props.args, props.headers, props.contentType);
}

function put<T>(props: RequestProps): Promise<T> {
    return http('PUT', props.url, props.args, props.headers, props.contentType);
}

function httpDelete<T>(props: RequestProps): Promise<T> {
    return http('DELETE', props.url, props.args, props.headers);
}

// ---------
// interface
// ---------

export {
    get,
    post,
    put,
    httpDelete as delete,
};
