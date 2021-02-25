export const ALERT_TOGGLE = 'ALERT_TOGGLE';

export type AlertState = {
    open: boolean;
};

export type AlertToggleOpenAction = {
    type: 'ALERT_TOGGLE';
    override?: boolean;
};

export type AlertActions = AlertToggleOpenAction;
