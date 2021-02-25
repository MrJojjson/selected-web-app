import { AlertState, ALERT_TOGGLE } from '../types/alertTypes';

type AlertOpenType = {
    override?: AlertState['open'];
};

export const alertToggleOpen = ({ ...props }: AlertOpenType) => ({
    type: ALERT_TOGGLE,
    ...props,
});
