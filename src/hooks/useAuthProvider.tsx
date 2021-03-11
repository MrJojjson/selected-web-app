import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import SignIn from '../pages/signIn';
import { authSetLoggedIn, getAuthState } from '../redux';

export const AuthProvider = ({ children }: any) => {
    const dispatch = useDispatch();
    const auth = getAuthState();
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(authSetLoggedIn({ token, user }));
        console.log(token ? '>>> SIGNED IN <<<' : '<<< SIGNED OUT >>>');
        if (token && location?.pathname === '/signIn') {
            history.push('/');
        } else if (!token) {
            history.push('/signIn');
        }
    }, []);

    return auth?.token ? children : <Route key="sign-in" path="/signIn" render={() => <SignIn />} />;
};
