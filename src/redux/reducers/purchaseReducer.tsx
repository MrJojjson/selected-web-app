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
                append({ data: WhiskyVars, uid: uniqueId('new-whisky-') }, state.incoming.added),
                state,
            );

        case PURCHASE_INCOMING_SELECTED:
            if (action.payload.remove) {
                return set(
                    lensPath(['incoming']),
                    { selected: [], data, added: reject(({ uid }) => includes(uid, selected), added) },
                    state,
                );
            }

            if (action.payload.clear) {
                return set(lensPath(['incoming', 'selected']), [], state);
            }

            if (action.payload.all) {
                return set(lensPath(['incoming']), { selected: pluck('uid', added), data, added }, state);
            }
            if (action.payload.all === false) {
                return set(lensPath(['incoming']), { selected: [], data, added }, state);
            }
            const exists = includes(action.payload.uid, selected);

            return set(
                lensPath(['incoming', 'selected']),
                exists ? without([action.payload.uid], selected) : append(action.payload.uid, selected),
                state,
            );

        case PURCHASE_INCOMING_ADDED_DATA:
            const { uid, id, value } = action?.payload;

            const index = findIndex(propEq('uid', uid))(added);
            const deepIndex = findIndex(propEq('id', id))(added[index].data);

            return set(lensPath(['incoming', 'added', index, 'data', deepIndex, 'value']), value, state);
        default:
            return state;
    }
};
