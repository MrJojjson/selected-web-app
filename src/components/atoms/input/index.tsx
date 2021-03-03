import React, { ChangeEvent } from 'react';
import { inputAutoCompleteTypes, inputType } from '../../../types/inputTypes';
import { themeType } from '../../../types/commonTypes';

import { Text } from '../';
import './input.style.scss';
import cn from 'classnames';

export type InputType = {
    onChange?: (event: ChangeEvent<EventTarget & HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<EventTarget & HTMLInputElement>) => void;
    label: string;
    name: string;
    type: inputType;
    placeholder: string;
    id?: string;
    error?: string;
    theme?: themeType;
    value?: string;
    autoComplete?: inputAutoCompleteTypes;
    required?: boolean;
    defaultValue?: string;
    className?: string;
};

export const Input = ({ onChange, onBlur, label, theme, error = '', className, ...rest }: InputType) => {
    return (
        <div className={cn('input_wrapper', className)}>
            <input
                onChange={(event) => onChange && onChange(event)}
                onBlur={(event) => onBlur && onBlur(event)}
                {...rest}
            />
            <label htmlFor={rest.name}>{label}</label>
            <Text theme="secondary" className={cn('error', { error_show: error !== '' })}>
                {error}
            </Text>
        </div>
    );
};
