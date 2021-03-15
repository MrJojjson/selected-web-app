import { SpiritsReducer } from './spiritsReducer';
import { combineReducers, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../storeState';
import { ModalActions } from '../types/modalTypes';
import { PurchaseActions } from '../types/purchaseTypes';

import { AuthReducer } from './authReducer';
import { ModalReducer } from './modalReducer';
import { PurchaseReducer } from './purchaseReducer';
import { SpiritsActions } from '../types/spiritsTypes';
import { CasksReducer } from './casksReducer';
import { CasksActions } from '../types/casksTypes';
import { SystemReducer } from './systemReducer';
import { SystemActions } from '../types/systemTypes';
import { ChartReducer } from './chartReducer';
import { ChartActions } from '../types/chartTypes';

export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>;

export type StoreAction = ModalActions | PurchaseActions | SpiritsActions | CasksActions | SystemActions | ChartActions;

export const rootReducer: Reducer<StoreState, StoreAction> = combineReducers({
    purchase: PurchaseReducer,
    auth: AuthReducer,
    modal: ModalReducer,
    spirits: SpiritsReducer,
    casks: CasksReducer,
    system: SystemReducer,
    charts: ChartReducer,
});
