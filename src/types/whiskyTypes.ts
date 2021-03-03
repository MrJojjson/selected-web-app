import { inputType } from './inputTypes';

export type WhiskyType = {
    name: string;
    distillery: string;
    distilledDate: Date;
    volume: number;
    status: string;
    recipe: string;
    ppm: number;
    ola: number;
    abv: number;
    createdAtUtc: Date;
    updatedAtUtc: Date;
    cask: WhiskyCaskType;
};

type WhiskyKeyType = keyof WhiskyType;

export type WhiskyVarsType = {
    id: WhiskyKeyType;
    title: string;
    type?: inputType;
    value?: string;
};

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

export type WhiskyCaskType = {
    id: string;
    number: string;
};

type WhiskyCaskKeyType = keyof WhiskyCaskType;

type WhiskyCaskVarsType = {
    id: WhiskyCaskKeyType;
    title: string;
};

export const WhiskyCaskVars: WhiskyCaskVarsType[] = [
    {
        id: 'number',
        title: 'Cask number',
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
