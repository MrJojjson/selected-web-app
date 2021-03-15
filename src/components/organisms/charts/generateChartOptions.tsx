import { find, map, propEq } from 'ramda';
import { InputVarsType } from '../../../types/inputTypes';

export const generetateChartOptions = ({ data, xAxis, yAxis }) => {
    let chartOptions = [];
    map(
        ({ data }) => {
            const { value: xValue } = find(propEq('id', xAxis))(data) as InputVarsType;
            const { value: yValue } = find(propEq('id', yAxis))(data) as InputVarsType;

            chartOptions = [
                ...chartOptions,
                { [xAxis]: xValue, [yAxis]: yValue, xNumber: Number(xValue), yNumber: Number(yValue) },
            ];
        },

        data,
    );
    return chartOptions;
};
