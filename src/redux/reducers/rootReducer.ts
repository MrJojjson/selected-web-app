import { combineReducers, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IStoreState } from '../storeState';
import { ModalActions } from '../types/modalTypes';
import { AuthReducer } from './authReducer';
import { ModalReducer } from './modalReducer';

export type ThunkResult<R> = ThunkAction<R, IStoreState, undefined, any>;

export type StoreAction = ModalActions;

export const rootReducer: Reducer<IStoreState, StoreAction> = combineReducers({
    modal: ModalReducer,
    auth: AuthReducer,
});
