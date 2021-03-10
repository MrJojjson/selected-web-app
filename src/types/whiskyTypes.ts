import { CaskType } from './caskTypes';
import { InputVarsType } from './inputTypes';

export type WhiskyType = {
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
};

export type WhiskyKeyType = keyof WhiskyType;

export type WhiskyVarsType = InputVarsType;

export const WhiskyVars: WhiskyVarsType[] = [
    {
        id: 'name',
        title: 'Name',
        type: 'text',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'distillery',
        title: 'Distillery',
        type: 'text',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'distilledDate',
        title: 'Distilled date',
        type: 'date',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'volume',
        title: 'Volume',
        type: 'number',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'status',
        title: 'Status',
        type: 'text',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'recipe',
        title: 'Recipe',
        type: 'text',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'ppm',
        title: 'PPM',
        type: 'number',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'ola',
        title: 'OLA',
        type: 'number',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'abv',
        title: 'ABV',
        type: 'number',
        value: '',
        belonging: 'whisky',
    },
];

export type APIWhiskiesReturnType = WhiskyType & {
    id?: string;
    createdAtUtc?: string;
    updatedAtUtc?: string;
};

export type ApiWhiskyKeyType = keyof APIWhiskiesReturnType;

export type ApiWhiskyVarsType = InputVarsType;

export const ApiWhiskyVars: ApiWhiskyVarsType[] = [
    ...WhiskyVars,
    {
        id: 'createdAtUtc',
        title: 'Created at',
        type: 'date',
        value: '',
        belonging: 'whisky',
    },
    {
        id: 'updatedAtUtc',
        title: 'Updated at',
        type: 'date',
        value: '',
        belonging: 'whisky',
    },
];

// export type RerackType = {
//     sourceId: string;
//     sourceName: string;
//     volume: number;
// };

// type RerackKeysType = keyof RerackType;

// type RerackVarsType = {
//     id: RerackKeysType;
//     title: string;
// };

// export const ReracksVars: RerackVarsType[] = [
//     {
//         id: 'sourceId',
//         title: 'Source id',
//     },
//     {
//         id: 'sourceName',
//         title: 'Source name',
//     },
//     {
//         id: 'volume',
//         title: 'Volume',
//     },
// ];
