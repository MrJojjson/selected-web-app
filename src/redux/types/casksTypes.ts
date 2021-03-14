import { BarElementType, BarHeadingType } from '../../layout/barLayout/bar';
import { CaskVarsType } from '../../types/caskTypes';
import { FormsListSpiritOnBlurType } from './formsTypes';
import { HistoryDataType } from './spiritsTypes';

export const CASKS_SELECTED = 'CASKS_SELECTED';
export const CASKS_ADD_DATA = 'CASKS_ADD_DATA';
export const CASKS_SET_FETCH = 'CASKS_SET_FETCH';
export const CASKS_TOGGLE_EDIT = 'CASKS_TOGGLE_EDIT';
export const CASKS_RENAME = 'CASKS_RENAME';
export const CASKS_REDO = 'CASKS_REDO';
export const CASKS_UNDO = 'CASKS_UNDO';
export const CASKS_REMOTE_FOCUS = 'CASKS_REMOTE_FOCUS';
export const CASKS_EXPAND_ALL = 'CASKS_EXPAND_ALL';

export type CasksState = {
    data: CasksDataType[];
    selected: string[];
    fetch: boolean;
    edit: boolean;
    expandAll: boolean;
    history: {
        data: HistoryDataType[];
        index: number | null;
        disabled: {
            undo: boolean;
            redo: boolean;
        };
    };
};

export type CasksDataType = Omit<BarElementType, 'className'> &
    Omit<BarHeadingType, 'className' | 'barBtn'> & {
        data: CaskVarsType[];
        uid: string;
    };

// SELECTED
export type CasksSelectedActionType = {
    id?: string;
    clear?: boolean;
    remove?: boolean;
    all?: boolean;
};

export type CasksSelectedAction = {
    type: 'CASKS_SELECTED';
    payload: CasksSelectedActionType;
};

// DATA
export type CasksAddDataActionType = {
    data: CasksDataType[];
};

export type CasksAddDataAction = {
    type: 'CASKS_ADD_DATA';
    payload: CasksAddDataActionType;
};

// FETCH
export type CasksSetFetchActionType = {
    fetch: CasksState['fetch'];
};

export type CasksSetFetchAction = {
    type: 'CASKS_SET_FETCH';
    payload: CasksSetFetchActionType;
};

// EDIT
export type CasksToggleEditAction = {
    type: 'CASKS_TOGGLE_EDIT';
};

// REDO
export type CasksRedoAction = {
    type: 'CASKS_REDO';
};

// UNDO
export type CasksUndoAction = {
    type: 'CASKS_UNDO';
};

// RENAME
export type CasksRenameActionType = FormsListSpiritOnBlurType;

export type CasksRenameAction = {
    type: 'CASKS_RENAME';
    payload: CasksRenameActionType;
};

// FOCUS
export type CasksFocusActionType = {
    data: HistoryDataType;
    remove?: boolean;
};

export type CasksFocusAction = {
    type: 'CASKS_REMOTE_FOCUS';
    payload: CasksFocusActionType;
};

// EXPAND ALL
export type CasksToggleExpandAllAction = {
    type: 'CASKS_EXPAND_ALL';
};

export type CasksActions =
    | CasksSelectedAction
    | CasksAddDataAction
    | CasksSetFetchAction
    | CasksToggleEditAction
    | CasksRedoAction
    | CasksUndoAction
    | CasksRenameAction
    | CasksFocusAction
    | CasksToggleExpandAllAction;
