import { StoreState } from '../storeState';
import { PurchaseIncomingState, PurchaseState } from '../types/purchaseTypes';
import { useSelector } from 'react-redux';

export const getPurchaseState = ({ purchase }: StoreState): PurchaseState => purchase;

export const getPurchaseIncomingState = () =>
    useSelector(({ purchase }: StoreState): PurchaseIncomingState => purchase?.incoming);

export const getPurchaseIncomingSelectedState = () => getPurchaseIncomingState()?.selected;

export const getPurchaseIncomingAddedState = () => getPurchaseIncomingState()?.added;
