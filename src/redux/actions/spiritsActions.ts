import {
    SpiritsAddDataActionType,
    SpiritsFocusActionType,
    SpiritsRenameActionType,
    SpiritsSelectedActionType,
    SpiritsSetFetchActionType,
    SPIRITS_ADD_DATA,
    SPIRITS_EXPAND_ALL,
    SPIRITS_REDO,
    SPIRITS_REMOTE_FOCUS,
    SPIRITS_RENAME,
    SPIRITS_SELECTED,
    SPIRITS_SET_FETCH,
    SPIRITS_TOGGLE_EDIT,
    SPIRITS_UNDO,
} from '../types/spiritsTypes';

export const spiritsSelected = ({ ...props }: SpiritsSelectedActionType) => ({
    type: SPIRITS_SELECTED,
    payload: { ...props },
});

export const spiritsAddData = ({ ...props }: SpiritsAddDataActionType) => ({
    type: SPIRITS_ADD_DATA,
    payload: { ...props },
});

export const spiritsSetFetch = ({ ...props }: SpiritsSetFetchActionType) => ({
    type: SPIRITS_SET_FETCH,
    payload: { ...props },
});

export const spiritsToggleEdit = () => ({
    type: SPIRITS_TOGGLE_EDIT,
});

export const spiritsRedo = () => ({
    type: SPIRITS_REDO,
});

export const spiritsUndo = () => ({
    type: SPIRITS_UNDO,
});

export const spiritsRename = ({ ...props }: SpiritsRenameActionType) => ({
    type: SPIRITS_RENAME,
    payload: { ...props },
});

export const setSpiritsRemoteFocus = ({ ...props }: SpiritsFocusActionType) => ({
    type: SPIRITS_REMOTE_FOCUS,
    payload: { ...props },
});

export const spiritsExpandAll = () => ({
    type: SPIRITS_EXPAND_ALL,
});
