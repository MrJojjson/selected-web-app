import { append, findIndex, includes, lensPath, pluck, propEq, reject, set, view, without } from 'ramda';
import {
    WhiskiesActions,
    WhiskiesDataType,
    WhiskiesState,
    WHISKIES_ADD_DATA,
    WHISKIES_RENAME,
    WHISKIES_SELECTED,
    WHISKIES_SET_FETCH,
    WHISKIES_TOGGLE_EDIT,
    WHISKIES_REDO,
} from '../types/whiskyTypes';

const initialState: WhiskiesState = {
    data: [],
    selected: [],
    fetch: true,
    edit: false,
    history: [],
};

type FindDataIndex = {
    data: WhiskiesDataType[];
    uid: string;
};

const findUidIndex = ({ data, uid }: FindDataIndex) => findIndex(propEq('uid', uid))(data);

export const WhiskiesReducer = (state: WhiskiesState = initialState, action: WhiskiesActions) => {
    const { data, selected } = state;

    switch (action.type) {
        case WHISKIES_REDO:
            const lastHist = state.history.pop();
            if (lastHist === undefined) {
                return { ...state, edit: false, history: [] };
            }
            return { ...state, data: lastHist, history: state.history };
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
            return { ...state, data: action.payload.data };
        case WHISKIES_SET_FETCH:
            return set(lensPath(['fetch']), action.payload.fetch, state);
        case WHISKIES_TOGGLE_EDIT:
            return set(lensPath(['edit']), !state.edit, state);
        case WHISKIES_RENAME:
            const index = findUidIndex({ data, uid: action?.payload.uid });
            const deepIndex = findIndex(propEq('id', action?.payload.id))(data[index].data);

            return set(lensPath(['data', index, 'data', deepIndex, 'value']), action?.payload.value, {
                ...state,
                history: [...state.history, data],
            });
        default:
            return state;
    }
};
