import React from 'react';
import { useDispatch } from 'react-redux';
import { BarLayout } from '../../../../layout/barLayout';
import { authChangeUserData, getAuthUserState } from '../../../../redux';
import { Header, Input } from '../../../atoms';
import './userForm.style.scss';

export const UserForm = () => {
    const { firstName = '', lastName = '', username = '', id } = getAuthUserState() || {};
    const dispatch = useDispatch();

    return (
        <BarLayout
            start={
                <Header tag="h2" fontSize="m">
                    Profile
                </Header>
            }
            overrideOpen={true}
        >
            <div className="user_form">
                <Input
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Username"
                    onBlur={({ currentTarget }) =>
                        dispatch(authChangeUserData({ type: 'username', value: currentTarget.value }))
                    }
                    value={username || ''}
                />
                <Input
                    type="text"
                    name="firstname"
                    label="Lastname"
                    placeholder="Lastname"
                    onBlur={({ currentTarget }) =>
                        dispatch(authChangeUserData({ type: 'lastName', value: currentTarget.value }))
                    }
                    value={lastName || ''}
                />
                <Input
                    type="text"
                    name="firstname"
                    label="Firstname"
                    placeholder="Firstname"
                    onBlur={({ currentTarget }) =>
                        dispatch(authChangeUserData({ type: 'firstName', value: currentTarget.value }))
                    }
                    value={firstName || ''}
                />
            </div>
        </BarLayout>
    );
};
