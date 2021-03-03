import React from 'react';
import { Text } from '../components/atoms';
import { Auth } from '../components/molecules/auth';
import { PageLayout } from '../layout/pageLayout';

export const Settings = () => {
    return (
        <PageLayout>
            <Text key="settings-text">DashboSettingsard</Text>
            <Auth key="settings-auth" />
        </PageLayout>
    );
};
