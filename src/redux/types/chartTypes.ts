import { CaskKeyType, CaskNumberKeyType } from '../../types/caskTypes';
import { SpiritKeyType, SpiritNumberKeyType } from '../../types/spiritsTypes';

export const CHART_CHANGE_DATA = 'CHART_CHANGE_DATA';
export const CHART_ADD_NEW = 'CHART_ADD_NEW';

export type ChartAvailableType = 'area' | 'line' | 'bar';
export type ChartAvailableContentType = 'spirits' | 'casks';

export type ChartAxisValueType = SpiritKeyType | CaskKeyType;
export type ChartAxisNumberValueType = SpiritNumberKeyType | CaskNumberKeyType;

export type ChartsType = {
    id: string;
    type?: ChartAvailableType;
    xAxis?: ChartAxisValueType;
    yAxis?: ChartAxisNumberValueType;
    graphs?: ChartAxisNumberValueType[];
    content?: ChartAvailableContentType;
};

export type ChartState = ChartsType[];

// ADD NEW
export type ChartAddNewActionType = {
    type: ChartAvailableType;
    content: ChartAvailableContentType;
};

export type ChartAddNewAction = {
    type: 'CHART_ADD_NEW';
    payload: ChartAddNewActionType;
};

// CHANGE DATA
export type ChartDataActionType = {
    id: string;
    type: keyof Omit<ChartsType, 'id'>;
    value: ChartAxisValueType;
};

export type ChartDataAction = {
    type: 'CHART_CHANGE_DATA';
    payload: ChartDataActionType;
};

export type ChartActions = ChartAddNewAction | ChartDataAction;
