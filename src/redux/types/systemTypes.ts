import { HistoryDataType } from './spiritsTypes';

export const SYSTEM_LAYOUT_COLUMNS = 'SYSTEM_LAYOUT_COLUMNS';
export const SYSTEM_FOCUS = 'SYSTEM_FOCUS';

export type SystemLayoutPageState = {
    columns: '1' | '2' | '3' | '4';
};

export type SystemLayoutState = {
    spirits: SystemLayoutPageState;
    casks: SystemLayoutPageState;
};

export type SystemFocusState = {};

export type SystemState = {
    layout: SystemLayoutState;
    focus: SystemFocusState;
};

// COLUMNS
export type SystemLayoutColumnsActionType = {
    page: keyof SystemLayoutState;
    columns: SystemLayoutPageState['columns'];
};

export type SystemLayoutColumnsAction = {
    type: 'SYSTEM_LAYOUT_COLUMNS';
    payload: SystemLayoutColumnsActionType;
};

// FOCUS
export type SystemFocusActionType = HistoryDataType;

export type SystemFocusAction = {
    type: 'SYSTEM_FOCUS';
    payload: SystemFocusActionType;
};

export type SystemActions = SystemLayoutColumnsAction | SystemFocusAction;
