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
import { getSpiritsState } from '../../../../redux';
import { ChartsType } from '../../../../redux/types/chartTypes';
import { ChartBar } from '../../bars/chartBar';
import { generetateChartOptions } from '../generateChartOptions';
import './lineChart.style.scss';

type LineChartType = ChartsType;

const LineChart = ({ id, xAxis, yAxis, content }: LineChartType) => {
    const { data, selected, edit } = getSpiritsState();
    const chartOptions = generetateChartOptions({ data, xAxis, yAxis });

    return (
        <div className="chart_wrapper">
            <ChartBar id={id} xAxis={xAxis} yAxis={yAxis} content={content} />
            <ResponsiveContainer height={400} className="line-chart">
                <RechartLineChart data={chartOptions} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis dataKey={xAxis} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey={yAxis} stroke="blue" />
                </RechartLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
