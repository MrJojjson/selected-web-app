export type EventBaseType = {
    dateUtc: string;
    type: 'Filled' | 'Created';
};

export type EventFilledType = EventBaseType & {
    spiritName: string;
    spiritId: string;
    volume: number;
};

export type APIlogType = EventBaseType | EventFilledType;
