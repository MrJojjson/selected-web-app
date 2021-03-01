export const PURCHASE_INCOMING_SELECTED = 'PURCHASE_INCOMING_SELECTED';
export const PURCHASE_INCOMING_DATA = 'PURCHASE_INCOMING_DATA';

export type PurchaseIncomingState = {
    selected: string[];
    data: [];
};

export type PurchaseState = {
    incoming: PurchaseIncomingState;
};

export type PurchaseIncomingSelectedActionType = {
    id?: string;
    clear?: boolean;
};

export type PurchaseIncomingSelectedAction = {
    type: 'PURCHASE_INCOMING_SELECTED';
    payload: PurchaseIncomingSelectedActionType;
};

export type PurchaseIncomingDataType = {
    value: string;
    name: string;
};

export type PurchaseIncomingDataActionType = {
    id: string;
    data: PurchaseIncomingDataType;
};

export type PurchaseIncomingDataAction = {
    type: 'PURCHASE_INCOMING_DATA';
    payload: PurchaseIncomingDataActionType;
};

export type PurchaseActions = PurchaseIncomingSelectedAction | PurchaseIncomingDataAction;
