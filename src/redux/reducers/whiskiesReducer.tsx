import { append, findIndex, includes, lensPath, pluck, propEq, reject, set, view, without } from 'ramda';
import {
    HistoryDataType,
    WhiskiesActions,
    WhiskiesDataType,
    WhiskiesState,
    WHISKIES_ADD_DATA,
    WHISKIES_REDO,
    WHISKIES_REMOTE_FOCUS,
    WHISKIES_RENAME,
    WHISKIES_SELECTED,
    WHISKIES_SET_FETCH,
    WHISKIES_TOGGLE_EDIT,
    WHISKIES_UNDO,
} from '../types/whiskyTypes';

const initialState: WhiskiesState = {
    data: [],
    selected: [],
    fetch: true,
    edit: false,
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
    data: WhiskiesDataType[];
    uid: string;
};

const findUidIndex = ({ data, uid }: FindDataIndex) => findIndex(propEq('uid', uid))(data);

export const WhiskiesReducer = (state: WhiskiesState = initialState, action: WhiskiesActions) => {
    const { data, selected, history } = state;
    const historyDataLength = history?.data.length;
    const historyIndex = history?.index;

    switch (action.type) {
        case WHISKIES_REDO:
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
        case WHISKIES_UNDO:
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
        case WHISKIES_REMOTE_FOCUS:
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
        default:
            return state;
    }
};
