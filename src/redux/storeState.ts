import { AuthStateType } from './types/authTypes';
import { ModalState } from './types/modalTypes';
import { AlertState } from './types/alertTypes';
import { PurchaseState } from './types/purchaseTypes';
export interface StoreState {
    purchase: PurchaseState;
    modal: ModalState;
    alert: AlertState;
    auth: AuthStateType;
}

export type StoreStateField = keyof StoreState;
