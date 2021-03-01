import { includes, insert, without } from 'ramda';
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
            return {
                ...state,
                incoming: {
                    ...state.incoming,
                    // data: {
                    //     ...state.incoming.data,
                    //     [action.payload.id]: [...action.payload.data[action.payload.id], action.payload.data],
                    // },
                    data: insert((action.payload.id as unknown) as number, action.payload.data, state.incoming.data),
                },
            };
        default:
            return state;
    }
};
