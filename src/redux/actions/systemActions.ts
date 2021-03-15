import {
    SystemAlertToggleOpenActionType,
    SystemErrorActionType,
    SystemFocusActionType,
    SystemLayoutColumnsActionType,
    SYSTEM_ERROR,
    SYSTEM_FOCUS,
    SYSTEM_LAYOUT_COLUMNS,
    SYSTEM_ALERT_TOGGLE,
    SystemAlertContentActionType,
    SYSTEM_ALERT_CONTENT,
    SystemAlertContentLogActionType,
    SYSTEM_ALERT_CONTENT_LOG,
} from '../types/systemTypes';

export const setSystemLayoutColumns = ({ ...props }: SystemLayoutColumnsActionType) => ({
    type: SYSTEM_LAYOUT_COLUMNS,
    payload: { ...props },
});

export const setSystemFocus = ({ ...props }: SystemFocusActionType) => ({
    type: SYSTEM_FOCUS,
    payload: { ...props },
});

export const setSystemError = ({ ...props }: SystemErrorActionType) => ({
    type: SYSTEM_ERROR,
    payload: { ...props },
});

export const systemAlertToggleOpen = ({ ...props }: SystemAlertToggleOpenActionType) => ({
    type: SYSTEM_ALERT_TOGGLE,
    payload: { ...props },
});

export const systemAlertContent = ({ ...props }: SystemAlertContentActionType) => ({
    type: SYSTEM_ALERT_CONTENT,
    payload: { ...props },
});

export const systemAlertContentLog = ({ ...props }: SystemAlertContentLogActionType) => ({
    type: SYSTEM_ALERT_CONTENT_LOG,
    payload: { ...props },
});
