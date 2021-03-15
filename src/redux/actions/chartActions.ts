import { ChartDataActionType, CHART_CHANGE_DATA } from '../types/chartTypes';

export const setChartData = ({ ...props }: ChartDataActionType) => ({
    type: CHART_CHANGE_DATA,
    payload: { ...props },
});
