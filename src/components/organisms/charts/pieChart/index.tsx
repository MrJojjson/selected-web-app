import { map } from 'ramda';
import React, { PureComponent } from 'react';
import { PieChart as RechartPieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { getSpiritsState } from '../../../../redux';
import { ChartsType } from '../../../../redux/types/chartTypes';
import { ChartBar } from '../../bars/chartBar';
import { generetateChartOptions } from '../generateChartOptions';
import '../lineChart/lineChart.style.scss';
type BarChartType = ChartsType;

const PieChart = ({ id, xAxis, yAxis, content }: BarChartType) => {
    const { data, selected, edit } = getSpiritsState();
    const chartOptions = generetateChartOptions({ data, xAxis, yAxis });

    return (
        <div className="chart_wrapper">
            <ChartBar id={id} xAxis={xAxis} yAxis={yAxis} content={content} />
            <ResponsiveContainer width="100%" height={400}>
                <RechartPieChart width={400} height={400}>
                    <Pie
                        data={chartOptions}
                        dataKey="xNumber"
                        label
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                    />
                    <Pie
                        data={chartOptions}
                        dataKey="yNumber"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#82ca9d"
                        label
                    />
                </RechartPieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart;
