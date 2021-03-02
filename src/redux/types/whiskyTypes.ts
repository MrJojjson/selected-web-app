import { WhiskyType } from '../../types/whiskyTypes';
export const WHISKIES_SELECTED = 'WHISKIES_SELECTED';
export const WHISKIES_ADD_DATA = 'WHISKIES_ADD_DATA';

export type WhiskiesState = {
    data: WhiskyType[];
    selected: string[];
};

// SELECTED
export type WhiskiesSelectedActionType = {
    id?: string;
    clear?: boolean;
    remove?: boolean;
    all?: boolean;
};

export type WhiskiesSelectedAction = {
    type: 'WHISKIES_SELECTED';
    payload: WhiskiesSelectedActionType;
};

// DATA
export type WhiskiesAddDataActionType = {
    data: WhiskyType[];
};

export type WhiskiesAddDataAction = {
    type: 'WHISKIES_ADD_DATA';
    payload: WhiskiesAddDataActionType;
};

export type WhiskiesActions = WhiskiesSelectedAction | WhiskiesAddDataAction;
