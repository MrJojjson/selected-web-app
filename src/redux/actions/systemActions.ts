import {
    SystemFocusActionType,
    SystemLayoutColumnsActionType,
    SystemSortActionType,
    SYSTEM_FOCUS,
    SYSTEM_LAYOUT_COLUMNS,
    SYSTEM_SORT,
} from '../types/systemTypes';

export const setSystemLayoutColumns = ({ ...props }: SystemLayoutColumnsActionType) => ({
    type: SYSTEM_LAYOUT_COLUMNS,
    payload: { ...props },
});

export const setSystemFocus = ({ ...props }: SystemFocusActionType) => ({
    type: SYSTEM_FOCUS,
    payload: { ...props },
});

export const setSystemSort = ({ ...props }: SystemSortActionType) => ({
    type: SYSTEM_SORT,
    payload: { ...props },
});
