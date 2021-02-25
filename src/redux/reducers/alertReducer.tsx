import { AlertActions, AlertState, ALERT_TOGGLE } from '../types/alertTypes';

const initialState: AlertState = {
    open: false,
};

export const AlertReducer = (state: AlertState = initialState, action: AlertActions) => {
    switch (action.type) {
        case ALERT_TOGGLE:
            return {
                ...state,
                open: action.override || !state.open,
            };
        default:
            return state;
    }
};
