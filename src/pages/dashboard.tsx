import { map } from 'ramda';
import React, { lazy, Suspense } from 'react';
import { LoadingIndicator, Text } from '../components/atoms';
import { PageLayout } from '../layout/pageLayout';
import { getChartState } from '../redux/selectors/chartSelector';

const LineChart = lazy(() => import('../components/organisms/charts/lineChart'));
const PieChart = lazy(() => import('../components/organisms/charts/pieChart'));

const Dashboard = () => {
    const charts = getChartState();
    return (
        <PageLayout>
            <Suspense key="dashboard-line-chart-suspense" fallback={<LoadingIndicator />}>
                {map(
                    (chart) => (
                        <LineChart key={chart?.id} {...chart} />
                    ),
                    charts,
                )}
            </Suspense>
        </PageLayout>
    );
};

export default Dashboard;
