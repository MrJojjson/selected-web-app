import { append, findIndex, includes, lensPath, pluck, propEq, reject, set, without } from 'ramda';
import {
    CasksActions,
    CasksDataType,
    CasksState,
    CASKS_ADD_DATA,
    CASKS_REDO,
    CASKS_RENAME,
    CASKS_SELECTED,
    CASKS_SET_FETCH,
    CASKS_TOGGLE_EDIT,
} from '../types/casksTypes';

const initialState: CasksState = {
    data: [],
    selected: [],
    fetch: true,
    edit: false,
    history: [],
};

type FindDataIndex = {
    data: CasksDataType[];
    uid: string;
};

const findUidIndex = ({ data, uid }: FindDataIndex) => findIndex(propEq('uid', uid))(data);

export const CasksReducer = (state: CasksState = initialState, action: CasksActions) => {
    const { data, selected } = state;

    switch (action.type) {
        case CASKS_REDO:
            const lastHist = state.history.pop();
            if (lastHist === undefined) {
                return { ...state, edit: false, history: [] };
            }
            return { ...state, data: lastHist, history: state.history };
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
        case CASKS_RENAME:
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
