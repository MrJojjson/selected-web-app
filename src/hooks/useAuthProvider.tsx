import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { LoadingIndicator } from '../components/atoms';
import { authSetLoggedIn, getAuthState } from '../redux';
const SignIn = lazy(() => import('../pages/signIn'));

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

    return (
        <Suspense fallback={<LoadingIndicator />}>
            {auth?.token ? children : <Route key="sign-in" path="/signIn" render={() => <SignIn />} />}
        </Suspense>
    );
};
