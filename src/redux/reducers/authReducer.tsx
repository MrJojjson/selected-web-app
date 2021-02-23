import { AuthActions, AuthStateType, SET_LOGGED_IN_STATE, SET_FAKE_LOGGED_IN_STATE } from '../types/authTypes';

const initialState: AuthStateType = {
    loggedIn: false,
    token: null,
};

export const AuthReducer = (state: AuthStateType = initialState, action: AuthActions) => {
    switch (action.type) {
        case SET_LOGGED_IN_STATE:
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                token: action.payload.token,
            };
        case SET_FAKE_LOGGED_IN_STATE:
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                token: action.payload.token,
            };
        default:
            return state;
    }
};
