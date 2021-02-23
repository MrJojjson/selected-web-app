import { AuthStateType } from './types/authTypes';
import { ModalState } from './types/modalTypes';

export interface IStoreState {
    modal: ModalState;
    auth: AuthStateType;
}

export type IStoreStateField = keyof IStoreState;
