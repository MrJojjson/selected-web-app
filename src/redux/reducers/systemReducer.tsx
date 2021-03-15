import { append, lensPath, set } from 'ramda';
import {
    SystemActions,
    SystemState,
    SYSTEM_ALERT_CONTENT,
    SYSTEM_ALERT_TOGGLE,
    SYSTEM_ERROR,
    SYSTEM_FOCUS,
    SYSTEM_LAYOUT_COLUMNS,
    SYSTEM_ALERT_CONTENT_LOG,
} from '../types/systemTypes';

const initialState: SystemState = {
    layout: {
        spirits: {
            columns: '1',
        },
        casks: {
            columns: '1',
        },
    },
    focus: {},
    error: null,
    alert: {
        open: false,
        contentLog: [],
    },
};

export const SystemReducer = (state: SystemState = initialState, action: SystemActions) => {
    const { alert } = state;
    switch (action.type) {
        case SYSTEM_LAYOUT_COLUMNS:
            const { page, columns } = action?.payload;
            return set(lensPath(['layout', page, 'columns']), columns.toString(), state);
        case SYSTEM_FOCUS:
            return set(lensPath(['focus']), action.payload, state);
        case SYSTEM_ERROR:
            const { error } = action?.payload || {};
            return set(lensPath(['error']), error, {
                ...state,
                alert: {
                    open: true,
                },
            });
        case SYSTEM_ALERT_TOGGLE:
            const { override } = action?.payload || {};
            return set(lensPath(['alert', 'open']), override || !alert.open, state);
        case SYSTEM_ALERT_CONTENT:
            const { content, contentString } = action?.payload;
            return set(lensPath(['alert', content ? 'content' : 'contentString']), content || contentString, {
                ...state,
                alert: {
                    ...state.alert,
                    open: true,
                },
            });
        case SYSTEM_ALERT_CONTENT_LOG:
            return set(lensPath(['alert', 'contentLog']), append(action.payload, state.alert.contentLog), state);
        default:
            return state;
    }
};
