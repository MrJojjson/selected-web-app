import { lensPath, set } from 'ramda';
import { SystemActions, SystemState, SYSTEM_FOCUS, SYSTEM_LAYOUT_COLUMNS, SYSTEM_SORT } from '../types/systemTypes';

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
    sort: {
        whiskies: {
            type: 'distilledDate',
            order: 'ascend',
        },
        casks: {
            type: 'number',
            order: 'descend',
        },
    },
};

export const SystemReducer = (state: SystemState = initialState, action: SystemActions) => {
    switch (action.type) {
        case SYSTEM_LAYOUT_COLUMNS:
            const { page, columns } = action?.payload;
            return set(lensPath(['layout', page, 'columns']), columns.toString(), state);
        case SYSTEM_FOCUS:
            return set(lensPath(['focus']), action.payload, state);
        case SYSTEM_SORT:
            const { type, value, order } = action?.payload;
            return set(lensPath(['sort', type, order ? 'order' : 'type']), order || value, state);
        default:
            return state;
    }
};
