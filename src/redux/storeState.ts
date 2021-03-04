import { WhiskiesState } from './types/whiskyTypes';
import { AuthStateType } from './types/authTypes';
import { ModalState } from './types/modalTypes';
import { AlertState } from './types/alertTypes';
import { PurchaseState } from './types/purchaseTypes';
import { CasksState } from './types/casksTypes';
import { SystemState } from './types/systemTypes';
export interface StoreState {
    purchase: PurchaseState;
    modal: ModalState;
    alert: AlertState;
    auth: AuthStateType;
    whiskies: WhiskiesState;
    casks: CasksState;
    system: SystemState;
}

export type StoreStateField = keyof StoreState;
