import { CaskType } from './caskTypes';
import { InputVarsType } from './inputTypes';

export type APISpiritsReturnType = SpiritType & {
    createdAtUtc?: string;
    updatedAtUtc?: string;
    status?: number;
    message?: string;
    errorCode?: unknown;
};

export type SpiritType = {
    name?: string;
    distillery?: string;
    distilledDate?: string;
    volume?: number;
    status?: string;
    recipe?: string;
    ppm?: number;
    ola?: number;
    abv?: number;
    id?: string;
    cask?: {
        id?: CaskType['id'];
        number?: CaskType['number'];
    };
    log?: {};
};

export type SpiritKeyType = keyof SpiritType;
export type SpiritNumberKeyType = keyof Pick<SpiritType, 'abv' | 'ola' | 'ppm' | 'volume'>;

export type SpiritVarsType = InputVarsType;

export const SpiritVars: SpiritVarsType[] = [
    {
        id: 'name',
        title: 'Name',
        type: 'text',
        value: '1',
        belonging: 'spirit',
    },
    {
        id: 'distillery',
        title: 'Distillery',
        type: 'text',
        value: 'b',
        belonging: 'spirit',
    },
    {
        id: 'status',
        title: 'Status',
        type: 'text',
        value: 'c',
        belonging: 'spirit',
    },
    {
        id: 'recipe',
        title: 'Recipe',
        type: 'text',
        value: 'd',
        belonging: 'spirit',
    },
    {
        id: 'distilledDate',
        title: 'Distilled date',
        type: 'date',
        value: '2020-10-12',
        belonging: 'spirit',
    },
    {
        id: 'volume',
        title: 'Volume',
        type: 'number',
        value: '400',
        belonging: 'spirit',
    },
    {
        id: 'ppm',
        title: 'PPM',
        type: 'number',
        value: '40',
        belonging: 'spirit',
    },
    {
        id: 'ola',
        title: 'OLA',
        type: 'number',
        value: '50',
        belonging: 'spirit',
    },
    {
        id: 'abv',
        title: 'ABV',
        type: 'number',
        value: '67',
        belonging: 'spirit',
    },
];

export type ApiSpiritKeyType = keyof APISpiritsReturnType;

export type ApiSpiritVarsType = InputVarsType;

export const ApiSpiritVars: ApiSpiritVarsType[] = [
    ...SpiritVars,
    {
        id: 'createdAtUtc',
        title: 'Created at',
        type: 'date',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'updatedAtUtc',
        title: 'Updated at',
        type: 'date',
        value: '',
        belonging: 'spirit',
    },
];
