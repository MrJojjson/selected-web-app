import React from 'react';
import { Pie, PieChart as RechartPieChart, ResponsiveContainer } from 'recharts';
import { ChartsType } from '../../../redux/types/chartTypes';
import '../chart.style.scss';
import { generetateChartOptions } from './generateChartOptions';
type BarChartType = ChartsType;

const PieChart = ({ ...rest }: BarChartType) => {
    const chartOptions = generetateChartOptions({ ...rest });

    return (
        <div className="chart_wrapper">
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
