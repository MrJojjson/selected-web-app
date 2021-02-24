import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import en from '../i18n/locales/en';
import { localeType } from '../types/languageTypes';

export const useLang = () => {
    const [lang, setLang] = useState<localeType>(en);
    const { locale = 'en' } = useRouter();

    useEffect(() => {
        (async () => {
            const lang = await import(`../i18n/locales/${locale}`).then((result) => result?.default);
            setLang(lang);
        })();
    }, [locale]);
    return lang;
};
