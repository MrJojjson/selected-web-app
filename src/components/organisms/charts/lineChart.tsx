import { addIndex, map } from 'ramda';
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
import { pickColorByIndex } from '../../../common/utils/pickColor';
import { ChartsType } from '../../../redux/types/chartTypes';
import '../chart.style.scss';
import { generetateChartOptions } from './generateChartOptions';

type LineChartType = ChartsType;

const LineChart = ({ ...rest }: LineChartType) => {
    const chartOptions = generetateChartOptions({ ...rest });
    const { xAxis, yAxis, graphs } = rest;
    const generateGraphs = addIndex(map)((graph: string, index) => {
        return (
            <Line
                key={`${graph}-${index}`}
                type="monotone"
                dataKey={graph}
                stroke={pickColorByIndex({ index })}
                fill={pickColorByIndex({ index })}
            />
        );
    }, graphs);
    return (
        <div className="chart_wrapper">
            <ResponsiveContainer height={400} className="line-chart">
                <RechartLineChart data={chartOptions}>
                    <XAxis dataKey={xAxis} />
                    <YAxis type="number" domain={[0, yAxis]} />
                    <Legend className="chart_legend" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey={yAxis} stroke="rgb(240, 137, 128)" />
                    {generateGraphs}
                </RechartLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChart;
