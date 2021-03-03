import { WhiskyType } from '../../types/whiskyTypes';
export const WHISKIES_SELECTED = 'WHISKIES_SELECTED';
export const WHISKIES_ADD_DATA = 'WHISKIES_ADD_DATA';
export const WHISKIES_SET_FETCH = 'WHISKIES_SET_FETCH';

export type WhiskiesState = {
    data: WhiskyType[];
    selected: string[];
    fetch: boolean;
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

// FETCH
export type WhiskiesSetFetchActionType = {
    fetch: boolean;
};

export type WhiskiesSetFetchAction = {
    type: 'WHISKIES_SET_FETCH';
    payload: WhiskiesSetFetchActionType;
};

export type WhiskiesActions = WhiskiesSelectedAction | WhiskiesAddDataAction | WhiskiesSetFetchAction;
