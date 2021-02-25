import { IStoreState } from '../storeState';
import { AlertState } from '../types/alertTypes';
import { useSelector } from 'react-redux';

export const getAlertState = ({ alert }: IStoreState): AlertState => alert;
export const getAlertOpenState = () => useSelector(({ alert }: IStoreState): AlertState['open'] => alert.open);
