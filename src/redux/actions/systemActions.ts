import { SystemLayoutColumnsActionType, SYSTEM_LAYOUT_COLUMNS } from '../types/systemTypes';

export const setSystemLayoutColumns = ({ ...props }: SystemLayoutColumnsActionType) => ({
    type: SYSTEM_LAYOUT_COLUMNS,
    payload: { ...props },
});
