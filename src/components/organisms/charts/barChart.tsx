import { addIndex, map } from 'ramda';
import React from 'react';
import {
    Bar,
    BarChart as RechartBarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { pickColorByIndex } from '../../../common/utils/pickColor';
import { ChartsType } from '../../../redux/types/chartTypes';
import { generetateChartOptions } from './generateChartOptions';
import './chart.style.scss';

type BarChartType = ChartsType;

const BarChart = ({ ...rest }: BarChartType) => {
    const chartOptions = generetateChartOptions({ ...rest });
    const { xAxis, yAxis, graphs = [] } = rest;
    const generateGraphs = addIndex(map)((graph: string, index) => {
        return (
            <Bar
                key={`${graph}-${index}`}
                type="monotone"
                dataKey={graph}
                stackId="a"
                fill={pickColorByIndex({ index: index + 1 })}
            />
        );
    }, graphs);
    return (
        <ResponsiveContainer height={400} className="bar-chart">
            <RechartBarChart data={chartOptions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={yAxis} stackId="a" fill={pickColorByIndex({ index: 0 })} />
                {generateGraphs}
            </RechartBarChart>
        </ResponsiveContainer>
    );
};

export default BarChart;
