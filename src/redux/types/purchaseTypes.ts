import { UseApiType } from '../../types/apiTypes';
import { CaskVarsType } from '../../types/caskTypes';
import { InputVarsType } from '../../types/inputTypes';
import { SpiritCaskVarsType } from '../../types/spiritCaskTypes';
import { SpiritVarsType } from '../../types/spiritsTypes';
import { FormsListSpiritOnBlurType } from './formsTypes';
export const PURCHASE_INCOMING_SELECTED = 'PURCHASE_INCOMING_SELECTED';
export const PURCHASE_INCOMING_ADDED = 'PURCHASE_INCOMING_ADDED';
export const PURCHASE_INCOMING_ADDED_DATA = 'PURCHASE_INCOMING_ADDED_DATA';

export type PurchaseIncomingAddedState = {
    fetch: UseApiType;
    preFetch?: UseApiType | null;
    data: InputVarsType<SpiritCaskVarsType | SpiritVarsType | CaskVarsType>[];
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
    spirit?: boolean;
    spiritWithCask?: boolean;
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

export type PurchaseIncomingAddedDataActionType = FormsListSpiritOnBlurType;

export type PurchaseIncomingAddedDataAction = {
    type: 'PURCHASE_INCOMING_ADDED_DATA';
    payload: PurchaseIncomingAddedDataActionType;
};

export type PurchaseActions =
    | PurchaseIncomingAddedAction
    | PurchaseIncomingSelectedAction
    | PurchaseIncomingAddedDataAction;
