// import { navigate } from '@reach/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BarElement } from '../../../../layout/barLayout/bar';
import { Button } from '../../../atoms';

const ProfileNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onSignOut = () => {
        localStorage.setItem('token', null);
        localStorage.setItem('user', null);
        history.go(0);
    };

    const signOut = <Button mini label="Sign out" theme="secondary" icon="sign-out-alt" onClick={() => onSignOut()} />;

    return <BarElement end={signOut} />;
};

export default ProfileNav;
