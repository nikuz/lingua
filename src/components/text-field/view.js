// @flow

import * as React from 'react';
import classNames from 'classnames';
import { ButtonTransparent } from '../button';
import Loading from '../loading';
import type { FormReducerState } from '../../reducers/form';
import './style.css';

export type TextFieldData = {
    id: string,
    value: string | number,
};

type Props = {
    form: FormReducerState,
    type?: string,
    value?: string | number,
    min: number,
    max: number,
    className?: string | { [className: string]: * },
    label?: string,
    placeholder?: string,
    fieldClassName?: string,
    id: string,
    disabled?: boolean,
    required?: boolean,
    autoFocus?: boolean,
    maxLength?: number,
    passwordVisible?: boolean,
    spellcheck?: boolean,
    withClearButton?: boolean,
    withLoading?: boolean,
    onChange?: (e: TextFieldData) => *,
    onFocus?: (e: Event) => *,
    onBlur?: (e: Event) => *,
    onKeyDown?: (key: string) => *,
    onSubmit?: () => *,
    passwordVisibilityToggle: (field: string, value?: string | number) => *,
    setIntoStore: (field: string, value: string | number, valueType: string) => *,
    valueChange: (field: string, value: string | ?number) => *,
    clear: (field: string) => *,
};

class TextField extends React.Component<Props> {
    static defaultProps = {
        type: 'text',
        spellcheck: true,
        withClearButton: false,
        withLoading: false,
    };

    fieldEl: ?HTMLElement;

    shouldComponentUpdate = (nextProps: Props) => (
        nextProps.value !== this.props.value
        || nextProps.form[nextProps.id] !== this.props.form[this.props.id]
        || nextProps.disabled !== this.props.disabled
        || nextProps.withLoading !== this.props.withLoading
    );


    componentDidMount() {
        const {
            id,
            value,
            type,
        } = this.props;
        const fieldProps = this.props.form[id];
        if (!fieldProps) {
            this.props.setIntoStore(
                id,
                value !== undefined ? value : '',
                type === 'number' ? type : 'string'
            );
        }
    }

    componentWillUnmount() {
        this.props.clear(this.props.id);
    }

    passwordVisibilityToggle = () => {
        this.props.passwordVisibilityToggle(this.props.id, this.props.value);
    };

    onFocusHandler = (e: Event) => {
        const { onFocus } = this.props;

        if (onFocus && onFocus instanceof Function) {
            onFocus(e);
        }
    };

    onBlurHandler = (e: Event) => {
        const {
            id,
            onBlur,
            type,
            min,
            max,
            valueChange,
            onChange,
        } = this.props;
        let { value } = this.props;

        if (type === 'number' && (min || max)) {
            if (min && Number(value) < min) {
                value = min;
            } else if (max && Number(value) > max) {
                value = max;
            }
            if (value) {
                valueChange(id, value);
                if (onChange && onChange instanceof Function) {
                    onChange({ id, value });
                }
            }
        }

        if (onBlur && onBlur instanceof Function) {
            onBlur(e);
        }
    };

    onChangeHandler = (e: KeyboardEvent) => {
        const {
            onChange,
            id,
            type,
            valueChange,
        } = this.props;
        const target = e.target;
        let value = '';

        if (target instanceof HTMLInputElement) {
            value = target.value;
        } else {
            return;
        }

        if (type === 'number') {
            value = value.replace(/[^0-9.]/g, '');
            if (value !== '' && value !== '.') {
                value = Number(value);
            } else {
                value = null;
            }
        }

        valueChange(id, value);
        if (onChange && onChange instanceof Function) {
            onChange({ id, value });
        }
    };

    onKeyDownHandler = (e: KeyboardEvent) => {
        const {
            onKeyDown,
            onSubmit,
        } = this.props;

        if (e.key === 'Enter' && onSubmit instanceof Function) {
            onSubmit();
        }
        if (onKeyDown && onKeyDown instanceof Function) {
            onKeyDown(e.key);
        }
    };

    clearText = () => {
        const {
            onChange,
            id,
            type,
            valueChange,
        } = this.props;

        let value = '';
        if (type === 'number') {
            value = null;
        }

        valueChange(id, value);
        if (onChange && onChange instanceof Function) {
            onChange({ id, value });
        }
    };

    render() {
        const {
            id,
            label,
            disabled,
            required,
            autoFocus,
            type,
            maxLength,
            passwordVisible,
            min,
            max,
            placeholder,
            spellcheck,
            withClearButton,
            withLoading,
        } = this.props;
        let {
            value,
            className,
            fieldClassName,
        } = this.props;
        className = classNames(
            'text-field-wrapper',
            className
        );
        fieldClassName = classNames(
            'text-field',
            type === 'password' && 'tf-password',
            withClearButton && 'with-clear-button',
            fieldClassName
        );
        const labelEl = label && (
            <div className="text-field-label">
                {label}
                { required && (
                    <span className="field-required-marker"> *</span>
                ) }
            </div>
        );
        value = type === 'number' && value === null ? '' : value;

        return (
            <div className={className}>
                { labelEl }
                <input
                    ref={(el) => this.fieldEl = el}
                    type={passwordVisible ? 'text' : (type || 'text')}
                    id={id}
                    value={value}
                    className={fieldClassName}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    min={min}
                    max={max}
                    autoComplete="new-password"
                    spellCheck={spellcheck}
                    autoCapitalize={spellcheck === false ? 'none' : 'true'}
                    autoCorrect={spellcheck === false ? 'off' : 'on'}
                    placeholder={placeholder}
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                    onChange={this.onChangeHandler}
                    onKeyDown={this.onKeyDownHandler}
                />
                { type === 'password' && (
                    <ButtonTransparent
                        leftIcon={passwordVisible ? 'password-eye' : 'password-eye-closed'}
                        className="tf-password-visibility-switcher"
                        leftIconClassName="tfpvs-icon"
                        onClick={this.passwordVisibilityToggle}
                    />
                ) }
                { !withLoading && withClearButton && (
                    <ButtonTransparent
                        leftIcon="close"
                        className="tf-clear"
                        leftIconClassName="tf-clear-icon"
                        onClick={this.clearText}
                    />
                ) }
                { withLoading && (
                    <div className="tf-loading">
                        <Loading size="small" />
                    </div>
                ) }
            </div>
        );
    }
}

export default TextField;
