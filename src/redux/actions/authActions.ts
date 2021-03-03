import { AuthStateType, AUTH_LOGGED_IN_STATE } from '../types/authTypes';

type SetLoginStateType = Pick<AuthStateType, 'user' | 'token'>;

export const authSetLoggedIn = ({ user, token }: SetLoginStateType) => ({
    type: AUTH_LOGGED_IN_STATE,
    payload: {
        user,
        token,
    },
});
