export const CHART_CHANGE_DATA = 'CHART_CHANGE_DATA';

export type ChartsType = {
    id: string;
    xAxis: string;
    yAxis: string;
    content: string;
};

export type ChartState = ChartsType[];

export type ChartDataActionType = {
    id: string;
    type: 'yAxis' | 'xAxis' | 'content';
    value: string;
};

export type ChartDataAction = {
    type: 'CHART_CHANGE_DATA';
    payload: ChartDataActionType;
};

export type ChartActions = ChartDataAction;
