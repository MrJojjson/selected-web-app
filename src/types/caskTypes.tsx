import { InputVarsType } from './inputTypes';
import { WhiskyType } from './whiskyTypes';

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
    id?: string;
    whisky?: {
        id?: WhiskyType['id'];
        name?: WhiskyType['name'];
    };
};

export type CaskKeyType = keyof CaskType;

export type CaskVarsType = InputVarsType<CaskKeyType>;

export const CaskVars: CaskVarsType[] = [
    {
        id: 'number',
        title: 'Cask number',
        type: 'text',
        value: '',
        belonging: 'cask',
    },
    {
        id: 'type',
        title: 'Material',
        type: 'text',
        value: '',
        belonging: 'cask',
    },
    {
        id: 'size',
        title: 'Volume in liter',
        type: 'number',
        value: '',
        belonging: 'cask',
    },
    {
        id: 'base',
        title: 'Usage',
        type: 'text',
        value: '',
        belonging: 'cask',
    },
];

export type ApiCaskKeyType = keyof APICaskReturnType;

export type ApiCaskVarsType = InputVarsType<ApiCaskKeyType>;

export const ApiCaskVars: ApiCaskVarsType[] = [
    ...CaskVars,
    {
        id: 'createdAtUtc',
        title: 'Created at',
        type: 'date',
        value: '',
        belonging: 'cask',
    },
    {
        id: 'updatedAtUtc',
        title: 'Updated at',
        type: 'date',
        value: '',
        belonging: 'cask',
    },
];
