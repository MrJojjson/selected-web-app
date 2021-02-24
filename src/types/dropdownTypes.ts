import { ChangeEvent } from 'react';
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
