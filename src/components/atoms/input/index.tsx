import React, { ChangeEvent } from 'react';
import { inputAutoCompleteTypes, inputType, themeType } from '../../../types';
import { Text } from '../';
import styles from '../../../../styles/atoms/input.module.scss';

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
        <div className={styles.input_wrapper}>
            <input
                onChange={(event) => onChange && onChange(event)}
                onBlur={(event) => onBlur && onBlur(event)}
                {...rest}
            />
            <label htmlFor={rest.id}>{label}</label>
            <Text theme="secondary" className={`${styles.error} ${error ? styles.error_show : styles.error_hide}`}>
                {error}
            </Text>
        </div>
    );
};
