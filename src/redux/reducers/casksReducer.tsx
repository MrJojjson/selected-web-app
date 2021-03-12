import { append, findIndex, includes, lensPath, pluck, propEq, reject, set, view, without } from 'ramda';
import {
    CasksActions,
    CasksDataType,
    CasksState,
    CASKS_ADD_DATA,
    CASKS_EXPAND_ALL,
    CASKS_REDO,
    CASKS_REMOTE_FOCUS,
    CASKS_RENAME,
    CASKS_SELECTED,
    CASKS_SET_FETCH,
    CASKS_TOGGLE_EDIT,
    CASKS_UNDO,
} from '../types/casksTypes';
import { HistoryDataType } from '../types/whiskyTypes';

const initialState: CasksState = {
    data: [],
    selected: [],
    fetch: true,
    edit: false,
    expandAll: false,
    history: {
        data: [],
        index: null,
        disabled: {
            undo: true,
            redo: true,
        },
    },
};

type FindDataIndex = {
    data: CasksDataType[];
    uid: string;
};

const findUidIndex = ({ data, uid }: FindDataIndex) => findIndex(propEq('uid', uid))(data);

export const CasksReducer = (state: CasksState = initialState, action: CasksActions) => {
    const { data, selected, history } = state;
    const historyDataLength = history?.data.length;
    const historyIndex = history?.index;
    switch (action.type) {
        case CASKS_REDO:
            const { index: redoIndex, deepIndex: redoDeepIndex, newValue: redoNewValue } = history?.data[
                historyIndex
            ] as HistoryDataType;

            const redoHistoryLens = lensPath(['data', redoIndex, 'data', redoDeepIndex, 'value']);

            return set(redoHistoryLens, redoNewValue, {
                ...state,
                history: {
                    ...state.history,
                    index: historyIndex >= historyDataLength - 1 ? historyDataLength - 1 : historyIndex + 1,
                    disabled: {
                        redo: historyIndex === historyDataLength - 1,
                        undo: false,
                    },
                },
            });
        case CASKS_UNDO:
            const { index: undoIndex, deepIndex: undoDeepIndex, value: undoValue } = history?.data[
                historyIndex
            ] as HistoryDataType;

            const undoHistoryLens = lensPath(['data', undoIndex, 'data', undoDeepIndex, 'value']);

            return set(undoHistoryLens, undoValue, {
                ...state,
                history: {
                    ...state.history,
                    index: historyIndex ? historyIndex - 1 : 0,
                    disabled: {
                        redo: false,
                        undo: historyIndex === 0,
                    },
                },
            });
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

            const lens = lensPath(['data', index, 'data', deepIndex, 'value']);
            const hist: HistoryDataType = {
                index,
                deepIndex,
                value: view(lens, state),
                newValue: action?.payload.value,
            };
            return set(lens, action?.payload.value, {
                ...state,
                history: {
                    data: append(hist, history.data),
                    index: historyDataLength,
                    disabled: {
                        undo: false,
                        redo: true,
                    },
                },
            });
        case CASKS_REMOTE_FOCUS:
            const { remove } = action?.payload;
            const { index: focusIndex, deepIndex: foxusDeepIndex } = action?.payload?.data || {};
            if (remove) {
                return set(lensPath(['data', focusIndex, 'data', foxusDeepIndex, 'focus']), null, state);
            }
            return set(lensPath(['data', focusIndex, 'data', foxusDeepIndex, 'focus']), action?.payload?.data, state);
        case CASKS_EXPAND_ALL:
            return set(lensPath(['expandAll']), !state.expandAll, state);
        default:
            return state;
    }
};
