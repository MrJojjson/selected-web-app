import { BarType } from '../../layout/barLayout/bar';
import { FormsListWhiskyListItemsType } from './formsTypes';

export const WHISKIES_SELECTED = 'WHISKIES_SELECTED';
export const WHISKIES_ADD_DATA = 'WHISKIES_ADD_DATA';
export const WHISKIES_SET_FETCH = 'WHISKIES_SET_FETCH';
export const WHISKIES_TOGGLE_EDIT = 'WHISKIES_TOGGLE_EDIT';

export type WhiskiesState = {
    data: WhiskiesDataType[];
    selected: string[];
    fetch: boolean;
    edit: boolean;
};

export type WhiskiesDataType = Omit<BarType, 'barBtn' | 'className'> & {
    data: FormsListWhiskyListItemsType['data'];
    uid: FormsListWhiskyListItemsType['uid'];
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
    data: WhiskiesDataType[];
};

export type WhiskiesAddDataAction = {
    type: 'WHISKIES_ADD_DATA';
    payload: WhiskiesAddDataActionType;
};

// FETCH
export type WhiskiesSetFetchActionType = {
    fetch: WhiskiesState['fetch'];
};

export type WhiskiesSetFetchAction = {
    type: 'WHISKIES_SET_FETCH';
    payload: WhiskiesSetFetchActionType;
};

// EDIT
export type WhiskiesToggleEditAction = {
    type: 'WHISKIES_TOGGLE_EDIT';
};

export type WhiskiesActions = WhiskiesSelectedAction | WhiskiesAddDataAction | WhiskiesSetFetchAction;
