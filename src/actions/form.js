// @flow

import {
    FORM_FIELD_SET_INTO_STORE,
    FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE,
    FORM_FIELD_VALUE_CHANGE,
    FORM_FIELD_CLEAR,
} from '../types/actions/form';
import type { FormFieldValue } from '../types';

export const fieldSetIntoStore = (
    field: string,
    value: FormFieldValue | FormFieldValue[],
    valueType: string
) => ({
    type: FORM_FIELD_SET_INTO_STORE,
    payload: {
        id: field,
        value,
        type: valueType,
    },
});

export const passwordVisibilityToggle = (id: string, value?: string | number) => ({
    type: FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE,
    wsForward: true,
    payload: {
        id,
        value,
    },
});

export const fieldValueChange = (
    id: string,
    value: FormFieldValue | FormFieldValue[]
) => ({
    type: FORM_FIELD_VALUE_CHANGE,
    wsForward: true,
    payload: {
        id,
        value,
    },
});

export const fieldClear = (id: string) => ({
    type: FORM_FIELD_CLEAR,
    payload: id,
});
