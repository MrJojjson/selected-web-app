// import { navigate } from '@reach/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BarElement } from '../../../../layout/barLayout/bar';
import { authSetLoggedIn } from '../../../../redux';
import { Button } from '../../../atoms';
import { Redirect } from 'react-router-dom';

export const ProfileNav = () => {
    const dispatch = useDispatch();

    const onSignOut = () => {
        dispatch(authSetLoggedIn({ token: null, user: null }));
        // navigate('/signIn');
        <Redirect to="signIn" />;
    };

    const signOut = <Button mini label="Sign out" theme="secondary" icon="sign-out-alt" onClick={() => onSignOut()} />;

    return <BarElement end={signOut} />;
};
