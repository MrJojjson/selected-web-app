import React, { lazy, Suspense } from 'react';
import { LoadingIndicator, Text } from '../components/atoms';
import { PageLayout } from '../layout/pageLayout';

const LineChart = lazy(() => import('../components/organisms/charts/lineChart'));

const Dashboard = () => {
    return (
        <PageLayout>
            <Suspense key="dashboard-line-chart-suspense" fallback={<LoadingIndicator />}>
                <LineChart />
            </Suspense>
        </PageLayout>
    );
};

export default Dashboard;
