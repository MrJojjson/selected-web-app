import { HistoryDataType } from './spiritsTypes';

export const SYSTEM_LAYOUT_COLUMNS = 'SYSTEM_LAYOUT_COLUMNS';
export const SYSTEM_FOCUS = 'SYSTEM_FOCUS';
export const SYSTEM_ERROR = 'SYSTEM_ERROR';
export const SYSTEM_ALERT_TOGGLE = 'SYSTEM_ALERT_TOGGLE';
export const SYSTEM_ALERT_CONTENT = 'SYSTEM_ALERT_CONTENT';
export const SYSTEM_ALERT_CONTENT_LOG = 'SYSTEM_ALERT_CONTENT_LOG';

// STATE
export type SystemState = {
    layout: SystemLayoutState;
    focus: SystemFocusState;
    error: SystemErrorState;
    alert: SystemAlertState;
};

// ALERT

export type SystemAlertLogType = {
    type: 'error' | 'information' | 'action';
    value: string;
    id: string;
};

export type SystemAlertState = {
    open: boolean;
    content?: JSX.Element;
    contentString?: string;
    contentLog?: SystemAlertLogType[];
};

export type SystemAlertToggleOpenActionType = {
    override?: boolean;
};

export type SystemAlertToggleOpenAction = {
    type: 'SYSTEM_ALERT_TOGGLE';
    payload: SystemAlertToggleOpenActionType;
};

export type SystemAlertContentActionType = Pick<SystemAlertState, 'content' | 'contentString'>;

export type SystemAlertContentAction = {
    type: 'SYSTEM_ALERT_CONTENT';
    payload: SystemAlertContentActionType;
};
export type SystemAlertContentLogActionType = SystemAlertLogType;

export type SystemAlertContentLogAction = {
    type: 'SYSTEM_ALERT_CONTENT_LOG';
    payload: SystemAlertContentLogActionType;
};

// COLUMNS
export type SystemLayoutPageState = {
    columns: '1' | '2' | '3' | '4';
};

export type SystemLayoutState = {
    spirits: SystemLayoutPageState;
    casks: SystemLayoutPageState;
};

export type SystemLayoutColumnsActionType = {
    page: keyof SystemLayoutState;
    columns: SystemLayoutPageState['columns'];
};

export type SystemLayoutColumnsAction = {
    type: 'SYSTEM_LAYOUT_COLUMNS';
    payload: SystemLayoutColumnsActionType;
};

// FOCUS
export type SystemFocusState = {};

export type SystemFocusActionType = HistoryDataType;

export type SystemFocusAction = {
    type: 'SYSTEM_FOCUS';
    payload: SystemFocusActionType;
};

// ERRORS

// export type SystemErrorsState = {
//     casks?: string;
//     spirits?: string;
//     purchase?: string;
// };

export type SystemErrorState = string;

export type SystemErrorActionType = {
    error: SystemErrorState;
};

export type SystemErrorAction = {
    type: 'SYSTEM_ERROR';
    payload: SystemErrorActionType;
};

export type SystemActions =
    | SystemLayoutColumnsAction
    | SystemFocusAction
    | SystemErrorAction
    | SystemAlertToggleOpenAction
    | SystemAlertContentAction
    | SystemAlertContentLogAction;
