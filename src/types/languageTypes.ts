import { DropdownOptionType } from './dropdownTypes';
export type LanguagePickerOptionsType = Pick<DropdownOptionType, 'label'> & {
    value: localesType;
};

export type localesType = 'en' | 'sv' | 'fr';

export type localeType = {
    test: string;
};
