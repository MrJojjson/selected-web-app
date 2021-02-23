import { useDispatch } from 'react-redux';
import { setLoginState } from './actions/authActions';
import { AuthStateType } from './types/authTypes';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { getAuthLoggedInState } from './selectors/authSelectors';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../components/atoms/loading';

type AuthProviderType = {
    children: any;
    token: AuthStateType['token'];
};

type VerifyTokenType = {
    token: string;
};

type VerifyTokenReturnType = {
    _id: string;
    name: string;
    iat: number;
    exp: number;
};

export const AuthProvider = ({ children, token }: AuthProviderType) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(<LoadingIndicator />);
    useEffect(() => {
        const expiredToken = isTokenExpired({ token });
        dispatch(setLoginState({ loggedIn: !expiredToken, token }));
    }, []);

    const router = useRouter();
    const secure = router.asPath.includes('secure');
    const loggedIn = getAuthLoggedInState();

    useEffect(() => {
        // console.log('Is logged in:', loggedIn);
        // console.log('Is secure:', secure);

        if (process.browser) {
            if (!secure && loggedIn) {
                router.push('/secure').then(() => {});
            } else if (secure && !loggedIn) {
                router.push('/').then(() => {});
            }
            setContent(children);
        }
    }, [secure, loggedIn]);

    return content;
};

const getVerifiedToken = ({ token }: VerifyTokenType): VerifyTokenReturnType =>
    jwt.verify(token, 'secret') as VerifyTokenReturnType;

export const isTokenExpired = ({ token }: VerifyTokenType) => {
    if (!token) return true;
    const { exp } = getVerifiedToken({ token });
    if (!exp) return true;
    const millisecondExp = exp * 1000;
    return Date.now() > millisecondExp;
};
