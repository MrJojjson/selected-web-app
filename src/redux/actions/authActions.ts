import {
    AuthChangeUserDataType,
    AuthStateType,
    AUTH_LOGGED_IN_STATE,
    AUTH_CHANGE_USER_DATA,
    AuthChangeUserType,
} from '../types/authTypes';

export const authSetLoggedIn = ({ user, token }: AuthStateType) => ({
    type: AUTH_LOGGED_IN_STATE,
    payload: {
        user,
        token,
    },
});

export const authChangeUserData = ({ ...props }: AuthChangeUserType) => ({
    type: AUTH_CHANGE_USER_DATA,
    payload: { ...props },
});
