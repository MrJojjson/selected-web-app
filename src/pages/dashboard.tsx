import React from 'react';
import { AddedCharts } from '../components/molecules/forms/dashboard/addedCharts';
import { PageLayout } from '../layout/pageLayout';

const Dashboard = () => {
    return (
        <PageLayout disableLayout>
            <AddedCharts />
        </PageLayout>
    );
};

export default Dashboard;
