import {
    WhiskiesSelectedActionType,
    WhiskiesAddDataActionType,
    WHISKIES_SELECTED,
    WHISKIES_ADD_DATA,
    WHISKIES_SET_FETCH,
    WhiskiesSetFetchActionType,
    WHISKIES_TOGGLE_EDIT,
    WHISKIES_RENAME,
    WHISKIES_REDO,
    WhiskiesRenameActionType,
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

export const whiskiesRename = ({ ...props }: WhiskiesRenameActionType) => ({
    type: WHISKIES_RENAME,
    payload: { ...props },
});
