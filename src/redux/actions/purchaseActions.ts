import {
    PurchaseIncomingSelectedActionType,
    PURCHASE_INCOMING_SELECTED,
    PurchaseIncomingDataActionType,
    PURCHASE_INCOMING_DATA,
} from '../types/purchaseTypes';

export const puchaseIncomingSelected = ({ ...props }: PurchaseIncomingSelectedActionType) => ({
    type: PURCHASE_INCOMING_SELECTED,
    payload: { ...props },
});

export const puchaseIncomingData = ({ ...props }: PurchaseIncomingDataActionType) => ({
    type: PURCHASE_INCOMING_DATA,
    payload: { ...props },
});
