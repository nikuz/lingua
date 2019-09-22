// @flow

import type {
    FormFieldString,
    FormFieldNumber,
    FormFieldBoolean,
    FormFieldArrayString,
    FormFieldArrayNumber,
    FormFieldArrayBoolean,
} from '../types';
import type { StoreState } from '../store/type';

export const getFieldString = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?string
): FormFieldString => {
    const field = state.form[fieldId];

    if (field && field.type === 'string') {
        return field;
    }

    return {
        type: 'string',
        id: fieldId,
        focused: false,
        value: defaultValue || '',
    };
};

export const getFieldNumber = (
    state: StoreState,
    fieldId: string,
    defaultValue?: number,
    min?: number,
    max?: number,
    step?: number | (value: number, direction?: string) => number,
    stepFirst?: number
): FormFieldNumber => {
    const field = state.form[fieldId];

    if (field && field.type === 'number') {
        return {
            ...field,
            min,
            max,
            step,
            stepFirst,
        };
    }

    return {
        type: 'number',
        id: fieldId,
        focused: false,
        value: defaultValue || null,
        min,
        max,
        step,
        stepFirst,
    };
};

export const getFieldBoolean = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?boolean
): FormFieldBoolean => {
    const field = state.form[fieldId];

    if (field && field.type === 'boolean') {
        return field;
    }

    return {
        type: 'boolean',
        id: fieldId,
        focused: false,
        value: defaultValue || false,
    };
};

export const getFieldArrayString = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?string[]
): FormFieldArrayString => {
    const field = state.form[fieldId];

    if (field && field.type === 'string[]') {
        return field;
    }

    return {
        type: 'string[]',
        id: fieldId,
        focused: false,
        value: defaultValue || [],
    };
};

export const getFieldArrayNumber = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?number[]
): FormFieldArrayNumber => {
    const field = state.form[fieldId];

    if (field && field.type === 'number[]') {
        return field;
    }

    return {
        type: 'number[]',
        id: fieldId,
        focused: false,
        value: defaultValue || [],
    };
};

export const getFieldArrayBoolean = (
    state: StoreState,
    fieldId: string,
    defaultValue: ?boolean[]
): FormFieldArrayBoolean => {
    const field = state.form[fieldId];

    if (field && field.type === 'boolean[]') {
        return field;
    }

    return {
        type: 'boolean[]',
        id: fieldId,
        focused: false,
        value: defaultValue || [],
    };
};
