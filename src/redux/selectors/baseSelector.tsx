import { useSelector } from 'react-redux';
import { StoreState } from '../storeState';

export const getState = () => useSelector((state: StoreState): StoreState => state);

type GetSpecificStateType = {
    page: keyof StoreState;
};
export const getSpecificState = ({ page }: GetSpecificStateType) =>
    useSelector((state: StoreState): StoreState[typeof page] => state[page]);
