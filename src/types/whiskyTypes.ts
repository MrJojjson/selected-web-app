import { inputType } from './inputTypes';

export type WhiskyType = {
    id: string;
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
    reracks: RerackType;
};

type WhiskyKeyType = keyof WhiskyType;

type WhiskyVarsType = {
    id: WhiskyKeyType;
    title: string;
    type: inputType;
};

export const WhiskyVars: WhiskyVarsType[] = [
    {
        id: 'distillery',
        title: 'Distillery',
        type: 'text',
    },
    {
        id: 'distilledDate',
        title: 'Distilled date',
        type: 'date',
    },
    {
        id: 'volume',
        title: 'Volume',
        type: 'number',
    },
    {
        id: 'status',
        title: 'Status',
        type: 'text',
    },
    {
        id: 'recipe',
        title: 'Recipe',
        type: 'text',
    },
    {
        id: 'ppm',
        title: 'PPM',
        type: 'number',
    },
    {
        id: 'ola',
        title: 'OLA',
        type: 'number',
    },
    {
        id: 'abv',
        title: 'ABV',
        type: 'number',
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
