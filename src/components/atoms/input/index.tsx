import React, { ChangeEvent, useEffect, useState } from 'react';
import { inputAutoCompleteTypes, inputType } from '../../../types/inputTypes';
import { themeType } from '../../../types/commonTypes';

import { Text } from '../';
import './input.style.scss';
import cn from 'classnames';
import { DateFormatted } from '../../../common/utils/dateFormat';

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
    autoComplete?: inputAutoCompleteTypes;
    required?: boolean;
    value?: string;
    className?: string;
    disabled?: boolean;
};

export const Input = ({
    onChange,
    onBlur,
    label,
    theme,
    error = '',
    className,
    disabled = false,
    value,
    ...rest
}: InputType) => {
    if (rest.type === 'date') {
        const date = value || new Date().toISOString();
        value = DateFormatted({
            date,
            options: { year: 'numeric', month: 'numeric', day: 'numeric' },
            locale: 'sv-SE',
        });
    }

    const [val, setVal] = useState<string | number>(value);

    useEffect(() => setVal(value), [value]);

    return (
        <div
            className={cn('input_wrapper', theme, className, {
                disabled,
            })}
        >
            <input
                onChange={({ currentTarget }) => setVal(currentTarget.value)}
                onBlur={(event) => onBlur && onBlur(event)}
                disabled={disabled}
                value={val}
                {...rest}
            />
            <label className="label" htmlFor={rest.name}>
                {label}
            </label>
            <Text theme="secondary" className={cn('error', { error_show: error !== '' })}>
                {error}
            </Text>
        </div>
    );
};
