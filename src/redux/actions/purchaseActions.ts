import {
    PurchaseIncomingSelectedActionType,
    PURCHASE_INCOMING_SELECTED,
    PurchaseIncomingAddedDataActionType,
    PURCHASE_INCOMING_ADDED_DATA,
    PURCHASE_INCOMING_ADDED,
} from '../types/purchaseTypes';

export const purchaseIncomingAdded = () => ({
    type: PURCHASE_INCOMING_ADDED,
});

export const purchaseIncomingSelected = ({ ...props }: PurchaseIncomingSelectedActionType) => ({
    type: PURCHASE_INCOMING_SELECTED,
    payload: { ...props },
});

export const purchaseIncomingAddedData = ({ ...props }: PurchaseIncomingAddedDataActionType) => ({
    type: PURCHASE_INCOMING_ADDED_DATA,
    payload: { ...props },
});
