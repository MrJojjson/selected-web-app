import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authSetLoggedIn, getAuthState } from '../redux';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = getAuthState();
    const history = useHistory();
    console.log('history', history);

    // useEffect(() => {
    //     const token = JSON.parse(localStorage.getItem('token'));
    //     const user = JSON.parse(localStorage.getItem('user'));

    //     if (!token || !user) {
    //         console.log('>>> SIGNED OUT <<<');
    //         dispatch(authSetLoggedIn({ token, user }));
    //         console.log('SNOWPACK_PUBLIC_FAKE_AUTH_TOKEN');
    //         // history.push('signIn');
    //     } else if (token && user) {
    //         console.log('>>> SIGNED IN <<<');
    //         dispatch(authSetLoggedIn({ token, user }));
    //         if (window?.location?.pathname === '/signIn') {
    //             // history.push('/');
    //         }
    //     }
    // }, []);

    useEffect(() => {
        const { token, user } = auth;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
    }, [auth]);

    return { loggedIn: !!auth?.token };
};
