import React, { ChangeEvent } from 'react';
import { inputAutoCompleteTypes, inputType, themeType } from '../../../types';
import { Text } from '../';
import './input.style.scss';
import cn from 'classnames';

export type InputType = {
    onChange?: (event: ChangeEvent<EventTarget & HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<EventTarget & HTMLInputElement>) => void;
    label: string;
    id: string;
    type: inputType;
    placeholder: string;
    error?: string;
    theme?: themeType;
    value?: string;
    autoComplete?: inputAutoCompleteTypes;
    required?: boolean;
    defaultValue?: string;
};

export const Input = ({ onChange, onBlur, label, theme, error = '', ...rest }: InputType) => {
    return (
        <div className={'input_wrapper'}>
            <input
                onChange={(event) => onChange && onChange(event)}
                onBlur={(event) => onBlur && onBlur(event)}
                {...rest}
            />
            <label htmlFor={rest.id}>{label}</label>
            <Text theme="secondary" className={cn('error', { error_show: error !== '' })}>
                {error}
            </Text>
        </div>
    );
};
