import { SpiritsState } from './types/spiritsTypes';
import { AuthStateType } from './types/authTypes';
import { ModalState } from './types/modalTypes';
import { PurchaseState } from './types/purchaseTypes';
import { CasksState } from './types/casksTypes';
import { SystemState } from './types/systemTypes';
import { ChartState } from './types/chartTypes';
export interface StoreState {
    purchase: PurchaseState;
    modal: ModalState;
    auth: AuthStateType;
    spirits: SpiritsState;
    casks: CasksState;
    system: SystemState;
    charts: ChartState;
}

export type StoreStateField = keyof StoreState;
