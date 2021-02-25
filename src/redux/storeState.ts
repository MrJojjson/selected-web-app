import { AuthStateType } from './types/authTypes';
import { ModalState } from './types/modalTypes';
import { AlertState } from './types/alertTypes';
export interface IStoreState {
    modal: ModalState;
    alert: AlertState;
    auth: AuthStateType;
}

export type IStoreStateField = keyof IStoreState;
