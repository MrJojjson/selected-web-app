export const AUTH_LOGGED_IN_STATE = 'AUTH_LOGGED_IN_STATE';
export const AUTH_CHANGE_USER_DATA = 'AUTH_CHANGE_USER_DATA';

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

export type AuthChangeUserType = {
    type: keyof Omit<AuthUserType, 'id'>;
    value: string;
};

export type AuthChangeUserDataType = {
    type: 'AUTH_CHANGE_USER_DATA';
    payload: AuthChangeUserType;
};

export type AuthActions = AuthSetLoggedInStateType | AuthChangeUserDataType;
