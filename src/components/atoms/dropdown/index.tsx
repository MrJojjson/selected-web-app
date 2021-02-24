import React, { ChangeEvent, useState } from 'react';
import styles from '../../../../styles/atoms/hamburger.module.scss';
import cn from 'classnames';
import { map } from 'ramda';
import { DropdownType } from '../../../types/dropdownTypes';

export const Dropdown = ({ options, id, label, defaultValue, onOptionChange }: DropdownType) => {
    const [value, setValue] = useState<string>(defaultValue);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log('target.value', event.target.value);
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
