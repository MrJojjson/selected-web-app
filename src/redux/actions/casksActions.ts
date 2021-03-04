import {
    CasksSelectedActionType,
    CasksAddDataActionType,
    CASKS_SELECTED,
    CASKS_ADD_DATA,
    CASKS_SET_FETCH,
    CasksSetFetchActionType,
    CASKS_TOGGLE_EDIT,
    CasksRenameActionType,
    CASKS_RENAME,
    CASKS_REDO,
} from '../types/casksTypes';

export const casksSelected = ({ ...props }: CasksSelectedActionType) => ({
    type: CASKS_SELECTED,
    payload: { ...props },
});

export const casksAddData = ({ ...props }: CasksAddDataActionType) => ({
    type: CASKS_ADD_DATA,
    payload: { ...props },
});

export const casksSetFetch = ({ ...props }: CasksSetFetchActionType) => ({
    type: CASKS_SET_FETCH,
    payload: { ...props },
});

export const casksToggleEdit = () => ({
    type: CASKS_TOGGLE_EDIT,
});

export const casksRedo = () => ({
    type: CASKS_REDO,
});

export const casksRename = ({ ...props }: CasksRenameActionType) => ({
    type: CASKS_RENAME,
    payload: { ...props },
});
