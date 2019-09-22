// @flow

import type { ErrorObject } from '../types';

export const makeError = (errorType: string, errorDetails: string): ErrorObject => ({
    error: errorType,
    message: errorDetails,
});
