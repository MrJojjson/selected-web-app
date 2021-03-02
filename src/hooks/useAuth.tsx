import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSetLoggedIn, getAuthState } from '../redux';

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = getAuthState();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('token') || '');
        const user = JSON.parse(localStorage.getItem('user') || '');

        if (!token || !user) {
            console.log('>>> SIGNED OUT <<<');
            setLoading(false);
        } else if (token && user) {
            console.log('>>> SIGNED IN <<<');
            dispatch(authSetLoggedIn({ token, user }));
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        const { token, user } = auth;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
    }, [auth]);

    return { loading };
};
