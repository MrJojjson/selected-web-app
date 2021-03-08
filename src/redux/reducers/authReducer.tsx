import { lensPath, set } from 'ramda';
import { AuthActions, AuthStateType, AUTH_CHANGE_USER_DATA, AUTH_LOGGED_IN_STATE } from '../types/authTypes';

const initialState: AuthStateType = {
    token: null,
    user: null,
};

export const AuthReducer = (state: AuthStateType = initialState, action: AuthActions) => {
    switch (action.type) {
        case AUTH_LOGGED_IN_STATE:
            const { token, user } = action?.payload;
            return { ...state, token, user };
        case AUTH_CHANGE_USER_DATA:
            const { type, value } = action?.payload;
            return set(lensPath(['user', type]), value, state);
        default:
            return state;
    }
};
