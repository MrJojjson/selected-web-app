import { CaskType } from './caskTypes';
import { InputVarsType } from './inputTypes';

export type APISpiritsReturnType = SpiritType & {
    createdAtUtc?: string;
    updatedAtUtc?: string;
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

export type SpiritVarsType = InputVarsType;

export const SpiritVars: SpiritVarsType[] = [
    {
        id: 'name',
        title: 'Name',
        type: 'text',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'distillery',
        title: 'Distillery',
        type: 'text',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'distilledDate',
        title: 'Distilled date',
        type: 'date',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'volume',
        title: 'Volume',
        type: 'number',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'status',
        title: 'Status',
        type: 'text',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'recipe',
        title: 'Recipe',
        type: 'text',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'ppm',
        title: 'PPM',
        type: 'number',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'ola',
        title: 'OLA',
        type: 'number',
        value: '',
        belonging: 'spirit',
    },
    {
        id: 'abv',
        title: 'ABV',
        type: 'number',
        value: '',
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
