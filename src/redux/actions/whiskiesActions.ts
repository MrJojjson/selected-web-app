import {
    WhiskiesSelectedActionType,
    WhiskiesAddDataActionType,
    WHISKIES_SELECTED,
    WHISKIES_ADD_DATA,
    WHISKIES_SET_FETCH,
    WhiskiesSetFetchActionType,
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
