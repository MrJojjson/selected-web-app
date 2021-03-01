export type WhiskyType = {
    Id: string;
    Name: string;
    Distillery: string;
    DistilledDate: Date;
    Volume: number;
    Status: string;
    Recipe: string;
    Ppm: number;
    Ola: number;
    Abv: number;
    CreatedAtUtc: Date;
    UpdatedAtUtc: Date;
    Cask: WhiskyCaskType;
    Reracks: RerackType;
};

export type WhiskyCaskType = {
    Id: string;
    Number: string;
};

export type RerackType = {
    SourceId: string;
    SourceName: string;
    Volume: number;
};
