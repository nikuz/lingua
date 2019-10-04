// @flow

import type { ErrorObject } from '../types';

export const makeError = (errorType: string, errorDetails: string): ErrorObject => ({
    error: errorType,
    message: errorDetails,
});

export const makeBackgroundBlurred = (blur: boolean) => {
    const documentElement = document.documentElement;
    if (documentElement) {
        if (blur) {
            documentElement.classList.add('blurred');
        } else {
            documentElement.classList.remove('blurred');
        }
    }
};
