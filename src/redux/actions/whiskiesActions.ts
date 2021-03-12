import {
    WhiskiesAddDataActionType,
    WhiskiesFocusActionType,
    WhiskiesRenameActionType,
    WhiskiesSelectedActionType,
    WhiskiesSetFetchActionType,
    WHISKIES_ADD_DATA,
    WHISKIES_EXPAND_ALL,
    WHISKIES_REDO,
    WHISKIES_REMOTE_FOCUS,
    WHISKIES_RENAME,
    WHISKIES_SELECTED,
    WHISKIES_SET_FETCH,
    WHISKIES_TOGGLE_EDIT,
    WHISKIES_UNDO,
} from '../types/whiskyTypes';

export const whiskiesSelected = ({ ...props }: WhiskiesSelectedActionType) => ({
    type: WHISKIES_SELECTED,
    payload: { ...props },
});

export const whiskiesAddData = ({ ...props }: WhiskiesAddDataActionType) => ({
    type: WHISKIES_ADD_DATA,
    payload: { ...props },
});

export const whiskiesSetFetch = ({ ...props }: WhiskiesSetFetchActionType) => ({
    type: WHISKIES_SET_FETCH,
    payload: { ...props },
});

export const whiskiesToggleEdit = () => ({
    type: WHISKIES_TOGGLE_EDIT,
});

export const whiskiesRedo = () => ({
    type: WHISKIES_REDO,
});

export const whiskiesUndo = () => ({
    type: WHISKIES_UNDO,
});

export const whiskiesRename = ({ ...props }: WhiskiesRenameActionType) => ({
    type: WHISKIES_RENAME,
    payload: { ...props },
});

export const setWhiskiesRemoteFocus = ({ ...props }: WhiskiesFocusActionType) => ({
    type: WHISKIES_REMOTE_FOCUS,
    payload: { ...props },
});

export const whiskiesExpandAll = () => ({
    type: WHISKIES_EXPAND_ALL,
});
