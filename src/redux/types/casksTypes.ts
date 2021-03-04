import { BarElementType, BarHeadingType } from '../../layout/barLayout/bar';
import { CaskVarsType } from '../../types/caskTypes';

export const CASKS_SELECTED = 'CASKS_SELECTED';
export const CASKS_ADD_DATA = 'CASKS_ADD_DATA';
export const CASKS_SET_FETCH = 'CASKS_SET_FETCH';
export const CASKS_TOGGLE_EDIT = 'CASKS_TOGGLE_EDIT';

export type CasksState = {
    data: CasksDataType[];
    selected: string[];
    fetch: boolean;
    edit: boolean;
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

export type CasksActions = CasksSelectedAction | CasksAddDataAction | CasksSetFetchAction | CasksToggleEditAction;
