import { BarElementType } from '../../layout/barLayout/bar';
import { WhiskyVarsType } from '../../types/whiskyTypes';
import { FormsListWhiskyOnBlurType } from '../types/formsTypes';

export const WHISKIES_SELECTED = 'WHISKIES_SELECTED';
export const WHISKIES_ADD_DATA = 'WHISKIES_ADD_DATA';
export const WHISKIES_SET_FETCH = 'WHISKIES_SET_FETCH';
export const WHISKIES_TOGGLE_EDIT = 'WHISKIES_TOGGLE_EDIT';

export const WHISKIES_RENAME = 'WHISKIES_RENAME';
export const WHISKIES_REDO = 'WHISKIES_REDO';
export const WHISKIES_UNDO = 'WHISKIES_UNDO';

export type HistoryDataType = {
    index?: number;
    deepIndex?: number;
    value?: string;
    newValue: string;
};

export type WhiskiesState = {
    data: WhiskiesDataType[];
    selected: string[];
    fetch: boolean;
    edit: boolean;
    history: {
        data: HistoryDataType[];
        index: number | null;
        disabled: {
            undo: boolean;
            redo: boolean;
        };
    };
};

export type WhiskiesDataType = Omit<BarElementType, 'barBtn' | 'className'> & {
    data: WhiskyVarsType[];
    uid: string;
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

// REDO
export type WhiskiesRedoAction = {
    type: 'WHISKIES_REDO';
};

// UNDO
export type WhiskiesUndoAction = {
    type: 'WHISKIES_UNDO';
};

// RENAME
export type WhiskiesRenameActionType = FormsListWhiskyOnBlurType;

export type WhiskiesRenameAction = {
    type: 'WHISKIES_RENAME';
    payload: WhiskiesRenameActionType;
};

export type WhiskiesActions =
    | WhiskiesSelectedAction
    | WhiskiesAddDataAction
    | WhiskiesSetFetchAction
    | WhiskiesToggleEditAction
    | WhiskiesRedoAction
    | WhiskiesUndoAction
    | WhiskiesRenameAction;
