import { CaskKeyType } from '../../types/caskTypes';
import { SpiritKeyType } from '../../types/spiritsTypes';

export const CHART_CHANGE_DATA = 'CHART_CHANGE_DATA';

export type ChartsType = {
    id: string;
    xAxis: SpiritKeyType | CaskKeyType;
    y2Axis?: SpiritKeyType | CaskKeyType;
    yAxis: SpiritKeyType | CaskKeyType;
    content: 'spirits' | 'casks';
};

export type ChartState = ChartsType[];

export type ChartDataActionType = {
    id: string;
    type: keyof Omit<ChartsType, 'id'>;
    value: string;
};

export type ChartDataAction = {
    type: 'CHART_CHANGE_DATA';
    payload: ChartDataActionType;
};

export type ChartActions = ChartDataAction;
