import { AuthActions, AuthStateType, AUTH_LOGGED_IN_STATE } from '../types/authTypes';

const initialState: AuthStateType = {
    token: null,
    user: null,
};

export const AuthReducer = (state: AuthStateType = initialState, action: AuthActions) => {
    const { token, user } = action?.payload || {};
    switch (action.type) {
        case AUTH_LOGGED_IN_STATE:
            return { ...state, token, user };
        default:
            return state;
    }
};
