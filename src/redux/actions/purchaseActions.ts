import {
    PurchaseIncomingSelectedActionType,
    PURCHASE_INCOMING_SELECTED,
    PurchaseIncomingAddedDataActionType,
    PURCHASE_INCOMING_ADDED_DATA,
    PURCHASE_INCOMING_ADDED,
    PurchaseIncomingAddedActionType,
} from '../types/purchaseTypes';

export const purchaseIncomingAdded = ({ ...props }: PurchaseIncomingAddedActionType) => ({
    type: PURCHASE_INCOMING_ADDED,
    payload: { ...props },
});

export const purchaseIncomingSelected = ({ ...props }: PurchaseIncomingSelectedActionType) => ({
    type: PURCHASE_INCOMING_SELECTED,
    payload: { ...props },
});

export const purchaseIncomingAddedData = ({ ...props }: PurchaseIncomingAddedDataActionType) => ({
    type: PURCHASE_INCOMING_ADDED_DATA,
    payload: { ...props },
});
