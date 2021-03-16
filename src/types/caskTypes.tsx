import { InputVarsType } from './inputTypes';
import { SpiritType } from './spiritsTypes';

export type APICaskReturnType = CaskType & {
    createdAtUtc?: string;
    updatedAtUtc?: string;
    status?: number;
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
export type CaskNumberKeyType = keyof Pick<CaskType, 'size'>;

export type CaskVarsType = InputVarsType;

export const CaskVars: CaskVarsType[] = [
    {
        id: 'number',
        title: 'Number',
        type: 'text',
        value: '',
        belonging: 'cask',
    },
    {
        id: 'type',
        title: 'Type',
        type: 'text',
        value: '',
        belonging: 'cask',
    },
    {
        id: 'size',
        title: 'Size',
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
