import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../hooks/useApi';
import { authSetLoggedIn } from '../../../redux';
import { Button, Input } from '../../atoms';
import './auth.style.scss';
import { useHistory } from 'react-router-dom';

// const { SNOWPACK_PUBLIC_FAKE_AUTH_USERNAME, SNOWPACK_PUBLIC_FAKE_AUTH_PASSWORD, SNOWPACK_PUBLIC_FAKE_AUTH_TOKEN } =
//     process?.env || {};

type SignInDataType = {
    username: string;
    password: string;
};

export const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [signInData, setSignInData] = useState<SignInDataType>({
        username: '',
        password: '',
    });
    const onSignIn = async () => {
        const { username, password } = signInData;
        // if (username === SNOWPACK_PUBLIC_FAKE_AUTH_USERNAME && password === SNOWPACK_PUBLIC_FAKE_AUTH_PASSWORD) {
        //     <Redirect to="/" />;
        //     dispatch(
        //         authSetLoggedIn({
        //             token: SNOWPACK_PUBLIC_FAKE_AUTH_TOKEN,
        //             user: { username, firstName: '', lastName: '', id: 'fake' },
        //         }),
        //     );
        // } else {
        const data = await fetchData({
            method: 'post',
            endpoint: ['users', 'authenticate'],
            data: { ...signInData },
        });
        const { token = null, user = null } = data || {};
        dispatch(authSetLoggedIn({ token, user }));
        console.log('token', token);

        if (token) {
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));
            history.go(0);
        }
        // }
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
