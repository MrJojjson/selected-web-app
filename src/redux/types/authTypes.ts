export const SET_LOGGED_IN_STATE = 'SET_LOGGED_IN_STATE';
export const SET_FAKE_LOGGED_IN_STATE = 'SET_FAKE_LOGGED_IN_STATE';

export type AuthStateType = {
    loggedIn: boolean;
    token: string | null;
};

export type AuthSetLoggedInStateType = {
    type: 'SET_LOGGED_IN_STATE';
    payload: AuthStateType;
};

export type AuthSetFakeLoggedInStateType = {
    type: 'SET_FAKE_LOGGED_IN_STATE';
    payload: AuthStateType;
};

export type AuthActions = AuthSetLoggedInStateType | AuthSetFakeLoggedInStateType;
