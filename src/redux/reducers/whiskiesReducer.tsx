import { append, includes, lensPath, pluck, reject, set, without } from 'ramda';
import {
    WhiskiesActions,
    WhiskiesState,
    WHISKIES_ADD_DATA,
    WHISKIES_SELECTED,
    WHISKIES_SET_FETCH,
    WHISKIES_TOGGLE_EDIT,
} from '../types/whiskyTypes';

const initialState: WhiskiesState = {
    data: [],
    selected: [],
    fetch: true,
    edit: false,
};

export const WhiskiesReducer = (state: WhiskiesState = initialState, action: WhiskiesActions) => {
    const { data, selected } = state;

    switch (action.type) {
        case WHISKIES_SELECTED:
            if (action.payload.remove) {
                return {
                    ...state,
                    selected: [],
                    data: reject(({ uid }) => includes(uid, selected), data),
                };
            }

            if (action.payload.clear) {
                return set(lensPath(['selected']), [], state);
            }

            if (action.payload.all) {
                return { ...state, selected: pluck('uid', data), data };
            }
            if (action.payload.all === false) {
                return { ...state, selected: [], data };
            }
            const exists = includes(action.payload.id, selected);

            return set(
                lensPath(['selected']),
                exists ? without([action.payload.id], selected) : append(action.payload.id, selected),
                state,
            );

        case WHISKIES_ADD_DATA:
            return set(lensPath(['data']), action.payload.data, state);
        case WHISKIES_SET_FETCH:
            return set(lensPath(['fetch']), action.payload.fetch, state);
        case WHISKIES_TOGGLE_EDIT:
            return set(lensPath(['edit']), !state.edit, state);
        default:
            return state;
    }
};
