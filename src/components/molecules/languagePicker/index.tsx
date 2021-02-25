import { ChangeEvent, useEffect } from 'react';
import { LanguagePickerOptionsType } from '../../../types/languageTypes';
import { Dropdown } from '../../atoms/dropdown';

const languageOptions: LanguagePickerOptionsType[] = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'sv',
        label: 'Swedish',
    },
    {
        value: 'fr',
        label: 'French',
    },
];

export const LanguagePicker = () => {
    // const { asPath, push: routerPush } = useRouter();

    const languageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const locale = event?.target?.value || '';
        // routerPush(asPath, null, { shallow: true, locale });
    };

    return <Dropdown label="Languages" id="language" onOptionChange={languageChange} options={languageOptions} />;
};
