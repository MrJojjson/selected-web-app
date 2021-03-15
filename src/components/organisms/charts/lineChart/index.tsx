import React from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart as RechartLineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { getCasksAddState, getSpiritsAddState } from '../../../../redux';
import { ChartsType } from '../../../../redux/types/chartTypes';
import { generetateChartOptions } from '../generateChartOptions';
import './lineChart.style.scss';

type LineChartType = ChartsType;

const LineChart = ({ xAxis, yAxis, y2Axis, content }: LineChartType) => {
    const data = content === 'spirits' ? getSpiritsAddState() : getCasksAddState();
    const chartOptions = generetateChartOptions({ data, xAxis, yAxis, y2Axis });
    console.log('chartOptions', chartOptions);

    return (
        <div className="chart_wrapper">
            <ResponsiveContainer height={400} className="line-chart">
                <RechartLineChart data={chartOptions}>
                    <XAxis dataKey={xAxis} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey={y2Axis} stroke="red" />
                    <Line type="monotone" dataKey={yAxis} stroke="blue" />
                </RechartLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
