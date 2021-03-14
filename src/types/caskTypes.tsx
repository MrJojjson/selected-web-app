import { InputVarsType } from './inputTypes';
import { SpiritType } from './spiritsTypes';

export type APICaskReturnType = CaskType & {
    createdAtUtc?: string;
    updatedAtUtc?: string;
};

export type CaskType = {
    number?: string;
    type?: string;
    size?: number;
    base?: string;
    id?: string;
    spirit?: {
        id?: SpiritType['id'];
        name?: SpiritType['name'];
    };
    log?: {};
};

export type CaskKeyType = keyof CaskType;

export type CaskVarsType = InputVarsType;

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
        title: 'Base',
        type: 'text',
        value: '',
        belonging: 'cask',
    },
];

export type ApiCaskKeyType = keyof APICaskReturnType;

export type ApiCaskVarsType = InputVarsType;

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
