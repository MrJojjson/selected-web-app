import { useSelector } from 'react-redux';
import { StoreState } from '../storeState';
import { ChartState } from '../types/chartTypes';

export const getChartState = () => useSelector(({ charts }: StoreState): ChartState => charts);
type GetChartStateByIdType = {
    id: string;
};
export const getChartStateById = ({ id }: GetChartStateByIdType) => getChartState()[id];
