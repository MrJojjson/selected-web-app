import { lensPath, set } from 'ramda';
import { SystemActions, SystemState, SYSTEM_FOCUS, SYSTEM_LAYOUT_COLUMNS } from '../types/systemTypes';

const initialState: SystemState = {
    layout: {
        whiskies: {
            columns: '1',
        },
        casks: {
            columns: '1',
        },
    },
    focus: {},
};

export const SystemReducer = (state: SystemState = initialState, action: SystemActions) => {
    switch (action.type) {
        case SYSTEM_LAYOUT_COLUMNS:
            const { page, columns } = action?.payload;
            return set(lensPath(['layout', page, 'columns']), columns.toString(), state);
        case SYSTEM_FOCUS:
            return set(lensPath(['focus']), action.payload, state);
        default:
            return state;
    }
};
