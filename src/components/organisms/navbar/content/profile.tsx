import { navigate } from '@reach/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BarElement } from '../../../../layout/barLayout/bar';
import { authSetLoggedIn } from '../../../../redux';
import { Button } from '../../../atoms';

export const ProfileNav = () => {
    const dispatch = useDispatch();

    const onSignOut = () => {
        dispatch(authSetLoggedIn({ token: null, user: null }));
        navigate('/signIn');
    };

    const signOut = <Button mini label="Sign out" theme="secondary" icon="sign-out-alt" onClick={() => onSignOut()} />;

    return <BarElement end={signOut} />;
};
