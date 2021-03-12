import { find, findIndex, map, propEq } from 'ramda';
import React from 'react';
import {
    LineChart as RechartLineChart,
    XAxis,
    Tooltip,
    CartesianGrid,
    Line,
    ResponsiveContainer,
    YAxis,
} from 'recharts';
import { getWhiskiesState } from '../../../../redux';
import { InputVarsType } from '../../../../types/inputTypes';
import './lineChart.style.scss';

type LineChartDataType = any;

const generetateChartOptions = ({ data, val1, val2 }) => {
    let chartOptions: LineChartDataType[] = [];
    map(
        ({ data }) => {
            const { title: yAxis, value: yValue } = find(propEq('id', val1))(data) as InputVarsType;
            const { title: xAxis, value: xValue } = find(propEq('id', val2))(data) as InputVarsType;

            chartOptions = [...chartOptions, { xAxis: yValue, [val1]: xValue, [val2]: yValue }];
        },

        data,
    );
    return chartOptions;
};

// const data = [
//     { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
//     { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
//     { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
//     { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
//     { name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
//     { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
//     { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
//     { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
//     { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
//     { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
// ];

const LineChart = () => {
    const { data, selected, edit } = getWhiskiesState();
    const val1 = 'volume';
    const val2 = 'abv';

    const chartOptions = generetateChartOptions({ data, val1, val2 });

    return (
        <ResponsiveContainer height={400} className="line-chart">
            <RechartLineChart data={chartOptions} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="xAxis" />

                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey={val1} stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey={val2} stroke="#387908" yAxisId={1} />
            </RechartLineChart>
        </ResponsiveContainer>
    );
};

export default LineChart;
