// @flow

import {
    FORM_FIELD_SET_INTO_STORE,
    FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE,
    FORM_FIELD_VALUE_CHANGE,
    FORM_FIELD_CLEAR,
} from '../types/actions/form';
import type {
    FormFieldString,
    FormFieldNumber,
    FormFieldBoolean,
    FormFieldArrayString,
    FormFieldArrayNumber,
    FormFieldArrayBoolean,
    FormFieldSetIntoStore,
    FormFieldPasswordVisibilityToggle,
    FormFieldValueChange,
    FormFieldClear,
} from '../types';

export type FormReducerState = {
    [key: string]: (
        FormFieldString
        | FormFieldNumber
        | FormFieldBoolean
        | FormFieldArrayString
        | FormFieldArrayNumber
        | FormFieldArrayBoolean
    ),
}

const initialState: FormReducerState = {};

type Action =
    FormFieldSetIntoStore
    | FormFieldPasswordVisibilityToggle
    | FormFieldValueChange
    | FormFieldClear;

export default function formReducer(
    state: FormReducerState = initialState,
    action: Action
): FormReducerState {
    switch (action.type) {
        case FORM_FIELD_SET_INTO_STORE: {
            const currentField = state[action.payload.id];
            if (currentField) {
                return state;
            }
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    value: action.payload.value,
                    type: action.payload.type,
                },
            };
        }

        case FORM_FIELD_PASSWORD_VISIBILITY_TOGGLE: {
            const currentField = state[action.payload.id];
            if (!currentField) {
                return state;
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...currentField,
                    passwordVisible: !currentField.passwordVisible,
                },
            };
        }

        case FORM_FIELD_VALUE_CHANGE:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    value: action.payload.value,
                    id: action.payload.id,
                },
            };

        case FORM_FIELD_CLEAR: {
            const newState = {
                ...state,
            };
            delete newState[action.payload];
            return newState;
        }

        default:
            (action: empty); // eslint-disable-line
            return state;
    }
}
