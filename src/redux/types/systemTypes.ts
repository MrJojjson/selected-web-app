export const SYSTEM_LAYOUT_COLUMNS = 'SYSTEM_LAYOUT_COLUMNS';

export type SystemLayoutPageState = {
    columns: '1' | '2' | '3' | '4';
};

export type SystemLayoutState = {
    whiskies: SystemLayoutPageState;
    casks: SystemLayoutPageState;
};

export type SystemState = {
    layout: SystemLayoutState;
};

// DATA

export type SystemLayoutColumnsActionType = {
    page: keyof SystemLayoutState;
    columns: SystemLayoutPageState['columns'];
};

export type SystemLayoutColumnsAction = {
    type: 'SYSTEM_LAYOUT_COLUMNS';
    payload: SystemLayoutColumnsActionType;
};

export type SystemActions = SystemLayoutColumnsAction;
