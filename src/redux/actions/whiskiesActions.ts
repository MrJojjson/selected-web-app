import {
    WhiskiesSelectedActionType,
    WhiskiesAddDataActionType,
    WHISKIES_SELECTED,
    WHISKIES_ADD_DATA,
} from '../types/whiskyTypes';

export const whiskiesSelected = ({ ...props }: WhiskiesSelectedActionType) => ({
    type: WHISKIES_SELECTED,
    payload: { ...props },
});

export const whiskiesAddData = ({ ...props }: WhiskiesAddDataActionType) => ({
    type: WHISKIES_ADD_DATA,
    payload: { ...props },
});
