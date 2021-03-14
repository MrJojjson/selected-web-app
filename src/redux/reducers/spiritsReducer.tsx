import { append, findIndex, includes, lensPath, pluck, propEq, reject, set, view, without } from 'ramda';
import {
    HistoryDataType,
    SpiritsActions,
    SpiritsDataType,
    SpiritsState,
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

const initialState: SpiritsState = {
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
    data: SpiritsDataType[];
    uid: string;
};

const findUidIndex = ({ data, uid }: FindDataIndex) => findIndex(propEq('uid', uid))(data);

export const SpiritsReducer = (state: SpiritsState = initialState, action: SpiritsActions) => {
    const { data, selected, history } = state;
    const historyDataLength = history?.data.length;
    const historyIndex = history?.index;

    switch (action.type) {
        case SPIRITS_REDO:
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
        case SPIRITS_UNDO:
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
        case SPIRITS_SELECTED:
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

        case SPIRITS_ADD_DATA:
            return { ...state, data: action.payload.data };
        case SPIRITS_SET_FETCH:
            return set(lensPath(['fetch']), action.payload.fetch, state);
        case SPIRITS_TOGGLE_EDIT:
            return set(lensPath(['edit']), !state.edit, state);
        case SPIRITS_RENAME:
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
        case SPIRITS_REMOTE_FOCUS:
            const { remove, initiator = 'undo' } = action?.payload;
            const { index: focusIndex, deepIndex: foxusDeepIndex } = action?.payload?.data || {};
            if (remove) {
                return set(lensPath(['data', focusIndex, 'data', foxusDeepIndex, 'focus']), null, state);
            }
            return set(
                lensPath(['data', focusIndex, 'data', foxusDeepIndex, 'focus']),
                { ...action?.payload?.data, initiator },
                state,
            );
        case SPIRITS_EXPAND_ALL:
            return set(lensPath(['expandAll']), !state.expandAll, state);
        default:
            return state;
    }
};
