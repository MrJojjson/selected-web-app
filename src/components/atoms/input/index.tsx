import React, { ChangeEvent, useEffect, useState } from 'react';
import { inputAutoCompleteTypes, inputType } from '../../../types/inputTypes';
import { themeType } from '../../../types/commonTypes';
import cn from 'classnames';
import { DateFormatted } from '../../../common/utils/dateFormat';
import { Text } from '../';

import './input.scss';

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
    focusValue?: string;
};

export const Input = ({
    onChange,
    onBlur,
    label,
    theme,
    error = '',
    className,
    disabled,
    value,
    focusValue,
    ...rest
}: InputType) => {
    if (rest.type === 'date' && value) {
        const date = value;
        value = DateFormatted({
            date,
            options: { year: 'numeric', month: 'numeric', day: 'numeric' },
            locale: 'sv-SE',
        });
    }
    const [val, setVal] = useState<string | number>(value);

    useEffect(() => setVal(value), [value]);

    const tempVal = <Text className="temp_value">{focusValue}</Text>;

    return (
        <div
            className={cn('input_wrapper', theme, className, {
                disabled,
                temp: focusValue,
            })}
        >
            <input
                onChange={({ currentTarget }) => setVal(currentTarget.value)}
                onBlur={(event) => {
                    const { value: currentValue } = event?.target || {};
                    if (onBlur && currentValue !== value) {
                        onBlur(event);
                    }
                }}
                disabled={disabled}
                value={val}
                {...rest}
            />
            <label className="label" htmlFor={rest.name}>
                {label}
            </label>
            {tempVal}
            <Text theme="secondary" className={cn('error', { error_show: error !== '' })}>
                {error}
            </Text>
        </div>
    );
};
