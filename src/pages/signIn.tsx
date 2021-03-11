import React from 'react';
import { Auth } from '../components/molecules/auth';
import { PageLayout } from '../layout/pageLayout';

export const SignIn = () => {
    return (
        <PageLayout>
            <Auth key="sign-in-auth" />
        </PageLayout>
    );
};

export default SignIn;
