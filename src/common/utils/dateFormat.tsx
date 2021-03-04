type DateFormattedOptionsType = 'long' | 'numeric' | 'short';

type DateFormattedLocaleType = string;

type DateFormattedType = {
    date?: string;
    options?: {
        year?: DateFormattedOptionsType;
        month?: DateFormattedOptionsType;
        day?: DateFormattedOptionsType;
        hour?: DateFormattedOptionsType;
        minute?: DateFormattedOptionsType;
        second?: DateFormattedOptionsType;
    };
    locale?: DateFormattedLocaleType;
};

const defaultOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
} as DateFormattedType['options'];

export const DateFormatted = ({
    date = new Date().toISOString(),
    options = { ...defaultOptions },
    locale = navigator.language,
}: DateFormattedType) => (Date.parse(date) ? new Intl.DateTimeFormat(locale, options).format(new Date(date)) : 'N/A');
