// @flow

import * as React from 'react';

export type FormFieldValue = string | number | boolean;
export type FormFieldValueTypes = 'string' | 'string[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]';

export type FormField = {
    id: string,
    focused?: boolean,
    passwordVisible?: boolean,
};

export type FormFieldString = FormField & {
    type: 'string',
    value: string,
};

export type FormFieldNumber = FormField & {
    type: 'number',
    value: ?number,
    min?: number,
    max?: number,
    step?: number | (value: number, direction?: string) => number,
    stepFirst?: number,
};

export type FormFieldBoolean = FormField & {
    type: 'boolean',
    value: boolean,
};

export type FormFieldArrayString = FormField & {
    type: 'string[]',
    value: string[],
};

export type FormFieldArrayNumber = FormField & {
    type: 'number[]',
    value: number[],
};

export type FormFieldArrayBoolean = FormField & {
    type: 'boolean[]',
    value: boolean[],
};

export type FormSelectorFieldItem = {
    value: FormFieldValue,
    text: string | number | React.Node,
    selected: ?boolean,
};
