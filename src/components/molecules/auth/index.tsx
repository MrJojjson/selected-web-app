import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../hooks/useApi';
import { authSetLoggedIn } from '../../../redux';
import { Button } from '../../atoms';

export const Auth = () => {
    const dispatch = useDispatch();

    const onLogIn = async () => {
        const data = await fetchData({
            method: 'post',
            endpoint: ['users', 'authenticate'],
            data: {
                username: 'admin',
                password: 'password',
            },
        });
        const { token = null, user = null } = data || {};

        dispatch(authSetLoggedIn({ token, user }));
    };

    const onLogOut = () => {
        dispatch(authSetLoggedIn({ token: null, user: null }));
    };

    return (
        <div>
            <Button label="Fake sign in" onClick={() => onLogIn()} />
            <Button label="Fake sign out" onClick={() => onLogOut()} />
        </div>
    );
};
