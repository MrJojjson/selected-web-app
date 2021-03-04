import { InputVarsType } from './inputTypes';

export type APICaskReturnType = CaskType & {
    id?: string;
    createdAtUtc?: string;
    updatedAtUtc?: string;
};

export type CaskType = {
    number?: string;
    type?: string;
    size?: number;
    base?: string;
    whisky?: string;
};

export type CaskKeyType = keyof CaskType;

export type CaskVarsType = InputVarsType<CaskKeyType>;

export const CaskVars: CaskVarsType[] = [
    {
        id: 'number',
        title: 'Cask number',
        type: 'text',
        value: '',
    },
    {
        id: 'type',
        title: 'Material',
        type: 'text',
        value: '',
    },
    {
        id: 'size',
        title: 'Volume in liter',
        type: 'number',
        value: '',
    },
    {
        id: 'base',
        title: 'Usage',
        type: 'text',
        value: '',
    },
];
