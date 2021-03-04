import { append, includes, lensPath, pluck, reject, set, without } from 'ramda';
import {
    CasksActions,
    CasksState,
    CASKS_ADD_DATA,
    CASKS_SELECTED,
    CASKS_SET_FETCH,
    CASKS_TOGGLE_EDIT,
} from '../types/casksTypes';

const initialState: CasksState = {
    data: [],
    selected: [],
    fetch: true,
    edit: false,
};

export const CasksReducer = (state: CasksState = initialState, action: CasksActions) => {
    const { data, selected } = state;

    switch (action.type) {
        case CASKS_SELECTED:
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

        case CASKS_ADD_DATA:
            return set(lensPath(['data']), action.payload.data, state);
        case CASKS_SET_FETCH:
            return set(lensPath(['fetch']), action.payload.fetch, state);
        case CASKS_TOGGLE_EDIT:
            return set(lensPath(['edit']), !state.edit, state);
        default:
            return state;
    }
};
