import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingIndicator } from '../components/atoms/loading';
import { setLoginState } from './actions/authActions';
import { getAuthLoggedInState } from './selectors/authSelectors';

type FakeAuthProviderType = {
    children: any;
};

export const FakeAuthProvider = ({ children }: FakeAuthProviderType) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(<LoadingIndicator />);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiredToken = token !== 'fake-token';
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
