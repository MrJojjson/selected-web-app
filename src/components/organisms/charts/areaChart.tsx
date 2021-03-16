import { addIndex, map } from 'ramda';
import React from 'react';
import {
    Area,
    AreaChart as RechartAreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { pickColorByIndex } from '../../../common/utils/pickColor';
import { ChartsType } from '../../../redux/types/chartTypes';
import './chart.style.scss';
import { generetateChartOptions } from './generateChartOptions';

type LineChartType = ChartsType;

const AreaChart = ({ ...rest }: LineChartType) => {
    const chartOptions = generetateChartOptions({ ...rest });
    const { xAxis, yAxis, graphs = [] } = rest;
    const generateGraphs = addIndex(map)((graph: string, index) => {
        return (
            <Area
                key={`${graph}-${index}`}
                type="monotone"
                dataKey={graph}
                stackId="1"
                stroke={pickColorByIndex({ index: index + 1 })}
                fill={pickColorByIndex({ index: index + 1 })}
            />
        );
    }, graphs);
    return (
        <div className="chart_wrapper">
            <ResponsiveContainer height={400} className="line-chart">
                <RechartAreaChart data={chartOptions}>
                    <XAxis dataKey={xAxis} />
                    <YAxis type="number" domain={[0, yAxis]} />
                    <Legend className="chart_legend" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Area
                        type="monotone"
                        dataKey={yAxis}
                        stackId="1"
                        stroke={pickColorByIndex({ index: 0 })}
                        fill={pickColorByIndex({ index: 0 })}
                    />
                    {generateGraphs}
                </RechartAreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaChart;
