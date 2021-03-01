import { StoreState } from '../storeState';
import { PurchaseIncomingState, PurchaseState } from '../types/purchaseTypes';
import { useSelector } from 'react-redux';

export const getPurchaseState = ({ purchase }: StoreState): PurchaseState => purchase;
export const getPurchaseIncomingState = ({ incoming }: PurchaseState): PurchaseIncomingState => incoming;

export const getPurchaseIncomingSelectedState = () =>
    useSelector(
        ({ purchase }: StoreState): PurchaseIncomingState['selected'] =>
            getPurchaseIncomingState({ ...purchase })?.selected,
    );
