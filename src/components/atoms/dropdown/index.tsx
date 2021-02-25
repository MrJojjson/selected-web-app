import React, { ChangeEvent, useState } from 'react';
import { map } from 'ramda';

export type DropdownType = {
    options: DropdownOptionType[];
    id: string;
    label: string;
    defaultValue?: string;
    onOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type DropdownOptionType = {
    label: string;
    value: string;
};

export const Dropdown = ({ options, id, label, defaultValue, onOptionChange }: DropdownType) => {
    const [value, setValue] = useState<string>(defaultValue);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onOptionChange(event);
        setValue(event.target.value);
    };

    return (
        <>
            <label htmlFor={id}>{label}</label>

            <select name={id} id={id} value={value} onChange={handleChange}>
                {map(({ value, label }) => {
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                }, options)}
            </select>
        </>
    );
};
