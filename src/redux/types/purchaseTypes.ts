import { BarType } from '../../layout/barLayout/bar';
import { WhiskyVarsType } from './../../types/whiskyTypes';
import { FormsListWhiskyListItemsType } from './formsTypes';
export const PURCHASE_INCOMING_SELECTED = 'PURCHASE_INCOMING_SELECTED';
export const PURCHASE_INCOMING_ADDED = 'PURCHASE_INCOMING_ADDED';
export const PURCHASE_INCOMING_ADDED_DATA = 'PURCHASE_INCOMING_ADDED_DATA';

export type PurchaseIncomingAddedState = Omit<BarType, 'barBtn' | 'className'> & FormsListWhiskyListItemsType;

export type PurchaseIncomingState = {
    selected: string[];
    data: [];
    added: PurchaseIncomingAddedState[];
};

export type PurchaseState = {
    incoming: PurchaseIncomingState;
};

// NEW ITEM
export type PurchaseIncomingAddedAction = {
    type: 'PURCHASE_INCOMING_ADDED';
    payload: {};
};

// SELECTED
export type PurchaseIncomingSelectedActionType = {
    uid?: string;
    clear?: boolean;
    remove?: boolean;
    all?: boolean;
};

export type PurchaseIncomingSelectedAction = {
    type: 'PURCHASE_INCOMING_SELECTED';
    payload: PurchaseIncomingSelectedActionType;
};

// DATA

export type PurchaseIncomingAddedDataActionType = {
    id: string;
    uid: string;
    value: string;
};

export type PurchaseIncomingAddedDataAction = {
    type: 'PURCHASE_INCOMING_ADDED_DATA';
    payload: PurchaseIncomingAddedDataActionType;
};

export type PurchaseActions =
    | PurchaseIncomingAddedAction
    | PurchaseIncomingSelectedAction
    | PurchaseIncomingAddedDataAction;
