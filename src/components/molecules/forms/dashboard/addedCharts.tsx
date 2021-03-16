import { map } from 'ramda';
import React, { lazy, Suspense } from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { getChartState } from '../../../../redux/selectors/chartSelector';
import { LoadingIndicator } from '../../../atoms';
import { ChartBar } from '../../../organisms/bars/chartBar';

const AreaChart = lazy(() => import('../../../organisms/charts/areaChart'));
const LineChart = lazy(() => import('../../../organisms/charts/lineChart'));

export const AddedCharts = () => {
    const chartsState = getChartState();

    const charts = map(
        (chart) => {
            console.log('b');

            let chartToRender: JSX.Element;
            switch (chart?.type) {
                case 'area':
                    chartToRender = <AreaChart {...chart} />;
                    break;
                case 'line':
                default:
                    chartToRender = <LineChart {...chart} />;
                    break;
            }
            return (
                <Suspense key={chart?.id} fallback={<LoadingIndicator />}>
                    <CompLayout>
                        <ChartBar {...chart} />
                        {chartToRender}
                    </CompLayout>
                </Suspense>
            );
        },

        chartsState,
    );

    return <>{[...charts]}</>;
};
