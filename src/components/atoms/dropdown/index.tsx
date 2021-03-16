import React, { ChangeEvent, useEffect, useState } from 'react';
import { map } from 'ramda';
import './dropdown.style.scss';
import cn from 'classnames';

export type DropdownType = {
    options: DropdownOptionType[];
    label: string;
    defaultValue?: string;
    onOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    mini?: boolean;
};

export type DropdownOptionType = {
    label: string;
    value: string;
};

export const Dropdown = ({ options, label, defaultValue, onOptionChange, mini }: DropdownType) => {
    const [value, setValue] = useState<string>(defaultValue);
    useEffect(() => setValue(defaultValue), [defaultValue]);
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onOptionChange(event);
        setValue(event.target.value);
    };

    return (
        <span
            className={cn('dropdown', {
                mini,
            })}
        >
            <label htmlFor={label}>{label}</label>
            <select name={label} id={label} value={value} onChange={handleChange}>
                {map(({ value, label }) => {
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                }, options)}
            </select>
        </span>
    );
};
