import { ChartAddNewActionType, ChartDataActionType, CHART_ADD_NEW, CHART_CHANGE_DATA } from '../types/chartTypes';

export const addNewChart = ({ ...props }: ChartAddNewActionType) => ({
    type: CHART_ADD_NEW,
    payload: { ...props },
});

export const setChartData = ({ ...props }: ChartDataActionType) => ({
    type: CHART_CHANGE_DATA,
    payload: { ...props },
});
