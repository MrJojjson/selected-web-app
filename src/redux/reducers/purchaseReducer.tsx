import { append, findIndex, includes, lensPath, pluck, propEq, reject, set, without } from 'ramda';
import { uniqueId } from '../../common/utils/uniqueId';
import { UseApiType } from '../../types/apiTypes';
import { CaskVars } from '../../types/caskTypes';
import { WhiskyCaskVars } from '../../types/whiskyCaskTypes';
import { WhiskyVars } from '../../types/whiskyTypes';
import {
    PurchaseActions,
    PurchaseState,
    PURCHASE_INCOMING_ADDED,
    PURCHASE_INCOMING_ADDED_DATA,
    PURCHASE_INCOMING_SELECTED,
} from '../types/purchaseTypes';

const initialState: PurchaseState = {
    incoming: {
        selected: [],
        data: [],
        added: [],
    },
};

let defaultFetch: UseApiType = {
    endpoint: 'whiskies',
    method: 'post',
};

export const PurchaseReducer = (state: PurchaseState = initialState, action: PurchaseActions) => {
    const { selected, added, data } = state.incoming;

    switch (action.type) {
        case PURCHASE_INCOMING_ADDED:
            let incomingAddData: any[] = WhiskyCaskVars;
            let uidPrefix = 'new-whisky-cask';
            if (action.payload.cask) {
                incomingAddData = CaskVars;
                uidPrefix = 'new-cask';
                defaultFetch.endpoint = 'casks';
            }
            if (action.payload.whisky) {
                incomingAddData = WhiskyVars;
                uidPrefix = 'new-whisky';
            }
            return set(
                lensPath(['incoming', 'added']),
                append({ data: incomingAddData, uid: uniqueId(uidPrefix), fetch: defaultFetch }, state.incoming.added),
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
