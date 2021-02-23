import { AuthStateType, SET_LOGGED_IN_STATE, SET_FAKE_LOGGED_IN_STATE } from '../types/authTypes';

type SetLoginStateType = Pick<AuthStateType, 'loggedIn' | 'token'>;

export const setLoginState = ({ loggedIn, token }: SetLoginStateType) => ({
    type: SET_LOGGED_IN_STATE,
    payload: {
        loggedIn,
        token,
    },
});

export const setFakeLoginState = ({ loggedIn, token }: SetLoginStateType) => ({
    type: SET_FAKE_LOGGED_IN_STATE,
    payload: {
        loggedIn,
        token,
    },
});
