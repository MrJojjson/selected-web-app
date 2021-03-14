import { BarElementType } from '../../layout/barLayout/bar';
import { SpiritVarsType } from '../../types/spiritsTypes';
import { FormsListSpiritOnBlurType } from './formsTypes';

export const SPIRITS_SELECTED = 'SPIRITS_SELECTED';
export const SPIRITS_ADD_DATA = 'SPIRITS_ADD_DATA';
export const SPIRITS_SET_FETCH = 'SPIRITS_SET_FETCH';
export const SPIRITS_TOGGLE_EDIT = 'SPIRITS_TOGGLE_EDIT';

export const SPIRITS_RENAME = 'SPIRITS_RENAME';
export const SPIRITS_REDO = 'SPIRITS_REDO';
export const SPIRITS_UNDO = 'SPIRITS_UNDO';
export const SPIRITS_REMOTE_FOCUS = 'SPIRITS_REMOTE_FOCUS';
export const SPIRITS_EXPAND_ALL = 'SPIRITS_EXPAND_ALL';

export type HistoryDataType = {
    index?: number;
    deepIndex?: number;
    value?: string;
    newValue?: string;
    initiator?: string;
};

export type SpiritsState = {
    data: SpiritsDataType[];
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

export type SpiritsDataType = Omit<BarElementType, 'barBtn' | 'className'> & {
    data: SpiritVarsType[];
    uid: string;
};

// SELECTED
export type SpiritsSelectedActionType = {
    id?: string;
    clear?: boolean;
    remove?: boolean;
    all?: boolean;
};

export type SpiritsSelectedAction = {
    type: 'SPIRITS_SELECTED';
    payload: SpiritsSelectedActionType;
};

// DATA
export type SpiritsAddDataActionType = {
    data: SpiritsDataType[];
};

export type SpiritsAddDataAction = {
    type: 'SPIRITS_ADD_DATA';
    payload: SpiritsAddDataActionType;
};

// FETCH
export type SpiritsSetFetchActionType = {
    fetch: SpiritsState['fetch'];
};

export type SpiritsSetFetchAction = {
    type: 'SPIRITS_SET_FETCH';
    payload: SpiritsSetFetchActionType;
};

// EDIT
export type SpiritsToggleEditAction = {
    type: 'SPIRITS_TOGGLE_EDIT';
};

// REDO
export type SpiritsRedoAction = {
    type: 'SPIRITS_REDO';
};

// UNDO
export type SpiritsUndoAction = {
    type: 'SPIRITS_UNDO';
};

// RENAME
export type SpiritsRenameActionType = FormsListSpiritOnBlurType;

export type SpiritsRenameAction = {
    type: 'SPIRITS_RENAME';
    payload: SpiritsRenameActionType;
};

// FOCUS
export type SpiritsFocusActionType = {
    data: HistoryDataType;
    remove?: boolean;
    initiator?: 'undo' | 'redo';
};

export type SpiritsFocusAction = {
    type: 'SPIRITS_REMOTE_FOCUS';
    payload: SpiritsFocusActionType;
};

// EXPAND ALL
export type SpiritsToggleExpandAllAction = {
    type: 'SPIRITS_EXPAND_ALL';
};

export type SpiritsActions =
    | SpiritsSelectedAction
    | SpiritsAddDataAction
    | SpiritsSetFetchAction
    | SpiritsToggleEditAction
    | SpiritsRedoAction
    | SpiritsUndoAction
    | SpiritsRenameAction
    | SpiritsFocusAction
    | SpiritsToggleExpandAllAction;
