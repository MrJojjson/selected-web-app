import { AlertActions } from './../types/alertTypes';
import { AlertReducer } from './alertReducer';
import { combineReducers, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../storeState';
import { ModalActions } from '../types/modalTypes';
import { PurchaseActions } from '../types/purchaseTypes';

import { AuthReducer } from './authReducer';
import { ModalReducer } from './modalReducer';
import { PurchaseReducer } from './purchaseReducer';

export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>;

export type StoreAction = ModalActions | AlertActions | PurchaseActions;

export const rootReducer: Reducer<StoreState, StoreAction> = combineReducers({
    purchase: PurchaseReducer,
    alert: AlertReducer,
    auth: AuthReducer,
    modal: ModalReducer,
});
