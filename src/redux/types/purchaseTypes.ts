import { UseApiType } from '../../types/apiTypes';
import { CaskVarsType } from '../../types/caskTypes';
import { InputVarsType } from '../../types/inputTypes';
import { WhiskyCaskVarsType } from '../../types/whiskyCaskTypes';
import { WhiskyVarsType } from '../../types/whiskyTypes';
import { FormsListWhiskyOnBlurType } from './formsTypes';
export const PURCHASE_INCOMING_SELECTED = 'PURCHASE_INCOMING_SELECTED';
export const PURCHASE_INCOMING_ADDED = 'PURCHASE_INCOMING_ADDED';
export const PURCHASE_INCOMING_ADDED_DATA = 'PURCHASE_INCOMING_ADDED_DATA';

export type PurchaseIncomingAddedState = {
    fetch: UseApiType;
    preFetch?: UseApiType | null;
    data: InputVarsType<WhiskyCaskVarsType | WhiskyVarsType | CaskVarsType>[];
    uid: string;
};

export type PurchaseIncomingState = {
    selected: string[];
    data: [];
    added: PurchaseIncomingAddedState[];
};

export type PurchaseState = {
    incoming: PurchaseIncomingState;
};

// NEW ITEM
export type PurchaseIncomingAddedActionType = {
    cask?: boolean;
    whisky?: boolean;
    whiskyWithCask?: boolean;
};

export type PurchaseIncomingAddedAction = {
    type: 'PURCHASE_INCOMING_ADDED';
    payload: PurchaseIncomingAddedActionType;
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

export type PurchaseIncomingAddedDataActionType = FormsListWhiskyOnBlurType;

export type PurchaseIncomingAddedDataAction = {
    type: 'PURCHASE_INCOMING_ADDED_DATA';
    payload: PurchaseIncomingAddedDataActionType;
};

export type PurchaseActions =
    | PurchaseIncomingAddedAction
    | PurchaseIncomingSelectedAction
    | PurchaseIncomingAddedDataAction;
