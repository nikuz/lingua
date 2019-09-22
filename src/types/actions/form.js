// @flow

import type { FormFieldValue } from '../form';

export const FORM_FIELD_SET_INTO_STORE = 'FORM_FIELD_SET_INTO_STORE';
export const FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE = 'FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE';
export const FORM_FIELD_VALUE_CHANGE = 'FORM_FIELD_VALUE_CHANGE';
export const FORM_FIELD_CLEAR = 'FORM_FIELD_CLEAR';

export type FormFieldSetIntoStore = {
    +type: 'FORM_FIELD_SET_INTO_STORE',
    +payload: {
        id: string,
        value: FormFieldValue | FormFieldValue[],
        type: 'string' | 'number' | 'boolean',
    },
};

export type FormFieldPasswordVisibilityToggle = {
    +type: 'FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE',
    +payload: {
        id: string,
        value?: string | number,
    },
};

export type FormFieldValueChange = {
    +type: 'FORM_FIELD_VALUE_CHANGE',
    +payload: {
        id: string,
        value: FormFieldValue | FormFieldValue[],
    },
};

export type FormFieldClear = {
    +type: 'FORM_FIELD_CLEAR',
    +payload: string,
};
