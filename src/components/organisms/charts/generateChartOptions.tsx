import { find, map, propEq } from 'ramda';
import { CasksDataType } from '../../../redux/types/casksTypes';
import { ChartsType } from '../../../redux/types/chartTypes';
import { SpiritsDataType } from '../../../redux/types/spiritsTypes';
import { CaskKeyType } from '../../../types/caskTypes';
import { InputVarsType } from '../../../types/inputTypes';
import { SpiritKeyType } from '../../../types/spiritsTypes';

type GeneretateChartOptionsType = Omit<ChartsType, 'id' | 'content'> & {
    data: SpiritsDataType[] | CasksDataType[];
};

type GeneretateChartOptionsReturnType = {
    [key in SpiritKeyType | CaskKeyType]?: ChartsType['xAxis'] | ChartsType['yAxis'] | number;
};

export const generetateChartOptions = ({ data, xAxis, yAxis, y2Axis }: GeneretateChartOptionsType) => {
    let chartOptions: GeneretateChartOptionsReturnType[] = [];
    map(
        ({ data }) => {
            const { value: xValue } = (find(propEq('id', xAxis))(data) as InputVarsType) || {};
            const { value: yValue } = (find(propEq('id', yAxis))(data) as InputVarsType) || {};
            const { value: y2Value } = (find(propEq('id', y2Axis))(data) as InputVarsType) || {};

            chartOptions = [...chartOptions, { [xAxis]: xValue, [yAxis]: yValue, [y2Axis]: y2Value }];
        },

        data,
    );
    return chartOptions;
};
