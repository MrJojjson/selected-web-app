import {
    append,
    findIndex,
    includes,
    insert,
    lensPath,
    map,
    over,
    pluck,
    propEq,
    reject,
    set,
    view,
    without,
} from 'ramda';
import { uniqueId } from '../../common/utils/uniqueId';
import { WhiskyVars } from '../../types/whiskyTypes';
import {
    PurchaseActions,
    PurchaseState,
    PURCHASE_INCOMING_SELECTED,
    PURCHASE_INCOMING_ADDED_DATA,
    PURCHASE_INCOMING_ADDED,
} from '../types/purchaseTypes';

const initialState: PurchaseState = {
    incoming: {
        selected: [],
        data: [],
        added: [],
    },
};

export const PurchaseReducer = (state: PurchaseState = initialState, action: PurchaseActions) => {
    const { selected, added, data } = state.incoming;

    switch (action.type) {
        case PURCHASE_INCOMING_ADDED:
            return set(
                lensPath(['incoming', 'added']),
                append({ data: WhiskyVars, id: uniqueId('new-whisky-') }, state.incoming.added),
                state,
            );

        case PURCHASE_INCOMING_SELECTED:
            if (action.payload.remove) {
                return set(
                    lensPath(['incoming']),
                    { selected: [], data, added: reject(({ id }) => includes(id, selected), added) },
                    state,
                );
            }

            if (action.payload.clear) {
                return set(lensPath(['incoming', 'selected']), [], state);
            }

            if (action.payload.all) {
                return set(lensPath(['incoming']), { selected: pluck('id', added), data, added }, state);
            }
            if (action.payload.all === false) {
                return set(lensPath(['incoming']), { selected: [], data, added }, state);
            }
            const exists = includes(action.payload.id, selected);

            return set(
                lensPath(['incoming', 'selected']),
                exists ? without([action.payload.id], selected) : append(action.payload.id, selected),
                state,
            );

        case PURCHASE_INCOMING_ADDED_DATA:
            const { uid, id, value } = action?.payload;

            const index = findIndex(propEq('id', uid))(added);
            const deepIndex = findIndex(propEq('id', id))(added[index].data);

            return set(lensPath(['incoming', 'added', index, 'data', deepIndex, id]), value, state);
        default:
            return state;
    }
};
