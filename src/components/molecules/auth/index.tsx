import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../hooks/useApi';
import { authSetLoggedIn } from '../../../redux';
import { Button, Input } from '../../atoms';
import './auth.style.scss';
import { navigate } from '@reach/router';

type SignInDataType = {
    username: string;
    password: string;
};

export const Auth = () => {
    const dispatch = useDispatch();
    const [signInData, setSignInData] = useState<SignInDataType>({
        username: '',
        password: '',
    });
    const onSignIn = async () => {
        const data = await fetchData({
            method: 'post',
            endpoint: ['users', 'authenticate'],
            data: { ...signInData },
        });
        const { token = null, user = null } = data || {};
        if (token && user) {
            navigate('/');
        }
        dispatch(authSetLoggedIn({ token, user }));
    };

    return (
        <div className="auth_form">
            <Input
                type="text"
                autoComplete="username"
                name="username"
                label="Username"
                placeholder="Username"
                onBlur={({ currentTarget }) => setSignInData({ ...signInData, username: currentTarget.value })}
                value={signInData.username}
            />
            <Input
                type="password"
                autoComplete="current-password"
                name="password"
                label="Password"
                placeholder="Password"
                onBlur={({ currentTarget }) => setSignInData({ ...signInData, password: currentTarget.value })}
                value={signInData.password}
            />
            <Button label="Sign in" theme="highlight" onClick={() => onSignIn()} />
        </div>
    );
};
