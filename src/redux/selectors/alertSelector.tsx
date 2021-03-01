import { StoreState } from '../storeState';
import { AlertState } from '../types/alertTypes';
import { useSelector } from 'react-redux';

export const getAlertState = ({ alert }: StoreState): AlertState => alert;
export const getAlertOpenState = () => useSelector(({ alert }: StoreState): AlertState['open'] => alert.open);
