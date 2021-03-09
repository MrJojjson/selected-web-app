import { ApiCaskKeyType } from '../../types/caskTypes';
import { ApiWhiskyKeyType } from '../../types/whiskyTypes';
import { HistoryDataType } from './whiskyTypes';

export const SYSTEM_LAYOUT_COLUMNS = 'SYSTEM_LAYOUT_COLUMNS';
export const SYSTEM_FOCUS = 'SYSTEM_FOCUS';
export const SYSTEM_SORT = 'SYSTEM_SORT';

export type SystemSortPageType<T> = {
    type: T;
    order: 'ascend' | 'descend';
};

export type SystemSortType = {
    whiskies: SystemSortPageType<ApiWhiskyKeyType>;
    casks: SystemSortPageType<ApiCaskKeyType>;
};

export type SystemLayoutPageState = {
    columns: '1' | '2' | '3' | '4';
};

export type SystemLayoutState = {
    whiskies: SystemLayoutPageState;
    casks: SystemLayoutPageState;
};

export type SystemFocusState = {};

export type SystemState = {
    layout: SystemLayoutState;
    focus: SystemFocusState;
    sort: SystemSortType;
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

// SORT
export type SystemSortActionType = {
    type: keyof SystemSortType;
    value?: ApiWhiskyKeyType | ApiCaskKeyType;
    order?: 'ascend' | 'descend';
};

export type SystemSortAction = {
    type: 'SYSTEM_SORT';
    payload: SystemSortActionType;
};

export type SystemActions = SystemLayoutColumnsAction | SystemFocusAction | SystemSortAction;
