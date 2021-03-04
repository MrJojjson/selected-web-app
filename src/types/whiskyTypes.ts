import { CaskType } from './caskTypes';
import { InputVarsType } from './inputTypes';

export type APIWhiskiesReturnType = WhiskyType & {
    id?: string;
    createdAtUtc?: string;
    updatedAtUtc?: string;
};

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
    cask?: {
        id: CaskType['number'];
    };
};

export type WhiskyKeyType = keyof WhiskyType;

export type WhiskyVarsType = InputVarsType<WhiskyKeyType>;
export const WhiskyVars: WhiskyVarsType[] = [
    {
        id: 'name',
        title: 'Name',
        type: 'text',
        value: '',
    },
    {
        id: 'distillery',
        title: 'Distillery',
        type: 'text',
        value: '',
    },
    {
        id: 'distilledDate',
        title: 'Distilled date',
        type: 'date',
        value: '',
    },
    {
        id: 'volume',
        title: 'Volume',
        type: 'number',
        value: '',
    },
    {
        id: 'status',
        title: 'Status',
        type: 'text',
        value: '',
    },
    {
        id: 'recipe',
        title: 'Recipe',
        type: 'text',
        value: '',
    },
    {
        id: 'ppm',
        title: 'PPM',
        type: 'number',
        value: '',
    },
    {
        id: 'ola',
        title: 'OLA',
        type: 'number',
        value: '',
    },
    {
        id: 'abv',
        title: 'ABV',
        type: 'number',
        value: '',
    },
];

export type RerackType = {
    sourceId: string;
    sourceName: string;
    volume: number;
};

type RerackKeysType = keyof RerackType;

type RerackVarsType = {
    id: RerackKeysType;
    title: string;
};

export const ReracksVars: RerackVarsType[] = [
    {
        id: 'sourceId',
        title: 'Source id',
    },
    {
        id: 'sourceName',
        title: 'Source name',
    },
    {
        id: 'volume',
        title: 'Volume',
    },
];
