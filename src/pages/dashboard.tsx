import { map } from 'ramda';
import React, { Fragment, lazy, Suspense } from 'react';
import { LoadingIndicator, Text } from '../components/atoms';
import { ChartBar } from '../components/organisms/bars/chartBar';
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
                    (chart) => {
                        return (
                            <Fragment key={chart?.id}>
                                <ChartBar {...chart} />
                                <LineChart {...chart} />
                            </Fragment>
                        );
                    },

                    charts,
                )}
            </Suspense>
        </PageLayout>
    );
};

export default Dashboard;
