export const AUTH_LOGGED_IN_STATE = 'AUTH_LOGGED_IN_STATE';

export type AuthUserType = {
    firstName: string;
    lastName: string;
    username: string;
    id: string;
};

export type AuthStateType = {
    token: string;
    user: AuthUserType;
};

export type AuthSetLoggedInStateType = {
    type: 'AUTH_LOGGED_IN_STATE';
    payload: AuthStateType;
};

export type AuthActions = AuthSetLoggedInStateType;
