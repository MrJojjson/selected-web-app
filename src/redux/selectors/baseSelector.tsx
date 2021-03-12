import { useSelector } from 'react-redux';
import { StoreState, StoreStateField } from '../storeState';

export const getState = () => useSelector((state: StoreState): StoreState => state);

type GetSpecificStateType = {
    page: StoreStateField;
};
export const getSpecificState = ({ page }: GetSpecificStateType) =>
    useSelector((state: StoreState): StoreState[StoreStateField] => state[page] as StoreState[StoreStateField]);
