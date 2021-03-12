import {
    SystemFocusActionType,
    SystemLayoutColumnsActionType,
    SYSTEM_FOCUS,
    SYSTEM_LAYOUT_COLUMNS,
} from '../types/systemTypes';

export const setSystemLayoutColumns = ({ ...props }: SystemLayoutColumnsActionType) => ({
    type: SYSTEM_LAYOUT_COLUMNS,
    payload: { ...props },
});

export const setSystemFocus = ({ ...props }: SystemFocusActionType) => ({
    type: SYSTEM_FOCUS,
    payload: { ...props },
});
