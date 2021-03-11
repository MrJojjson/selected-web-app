import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSetLoggedIn, getAuthState } from '../redux';
import { Redirect } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = getAuthState();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token'));
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
            console.log('>>> SIGNED OUT <<<');
            setLoading(false);
            <Redirect to="/signIn" />;
        } else if (token && user) {
            console.log('>>> SIGNED IN <<<');
            dispatch(authSetLoggedIn({ token, user }));
            setLoading(false);
            if (window?.location?.pathname === '/signIn') {
                <Redirect to="/" />;
            }
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        const { token, user } = auth;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
    }, [auth]);

    return { loading, loggedIn: !!auth?.token };
};
