import { includes, insert, lensPath, set, without } from 'ramda';
import {
    PurchaseActions,
    PurchaseState,
    PURCHASE_INCOMING_SELECTED,
    PURCHASE_INCOMING_DATA,
} from '../types/purchaseTypes';

const initialState: PurchaseState = {
    incoming: {
        selected: [],
        data: [],
    },
};

export const PurchaseReducer = (state: PurchaseState = initialState, action: PurchaseActions) => {
    const { payload } = action;
    switch (action.type) {
        case PURCHASE_INCOMING_SELECTED:
            if (action.payload.clear) {
                return {
                    ...state,
                    incoming: {
                        ...state.incoming,
                        selected: [],
                    },
                };
            }
            return {
                ...state,
                incoming: {
                    ...state.incoming,
                    selected: includes(payload.id, state.incoming.selected)
                        ? without([payload.id], state.incoming.selected)
                        : [...state.incoming.selected, payload.id],
                },
            };
        case PURCHASE_INCOMING_DATA:
            console.log('action', action);

            return {
                ...state,
                incoming: {
                    ...state.incoming,
                    data: set(
                        lensPath([action.payload.id, action.payload.data.name]),
                        action.payload.data.value,
                        state.incoming.data,
                    ),
                },
            };
        default:
            return state;
    }
};
