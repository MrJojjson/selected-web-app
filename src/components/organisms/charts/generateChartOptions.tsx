import { find, map, propEq } from 'ramda';
import { getCasksAddState, getSpiritsAddState } from '../../../redux';
import { CasksDataType } from '../../../redux/types/casksTypes';
import { ChartsType } from '../../../redux/types/chartTypes';
import { SpiritsDataType } from '../../../redux/types/spiritsTypes';
import { CaskKeyType } from '../../../types/caskTypes';
import { InputVarsType } from '../../../types/inputTypes';
import { SpiritKeyType } from '../../../types/spiritsTypes';

type GeneretateChartOptionsType = Omit<ChartsType, 'id'>;

type GeneretateChartOptionsReturnType = {
    [key in SpiritKeyType | CaskKeyType]?: ChartsType['xAxis'] | ChartsType['yAxis'] | number;
};

export const generetateChartOptions = ({ content, xAxis, yAxis, graphs = [] }: GeneretateChartOptionsType) => {
    const data = content === 'spirits' ? getSpiritsAddState() : getCasksAddState();

    let chartOptions: GeneretateChartOptionsReturnType[] = [];

    map(
        ({ data }) => {
            const { value: xValue } = (find(propEq('id', xAxis))(data) as InputVarsType) || {};
            const { value: yValue } = (find(propEq('id', yAxis))(data) as InputVarsType) || {};
            let newValues = { [xAxis]: xValue, [yAxis]: yValue };

            map((graph) => {
                const { value } = (find(propEq('id', graph))(data) as InputVarsType) || {};
                newValues = { ...newValues, [graph]: value };
            }, graphs);

            chartOptions = [...chartOptions, newValues];
        },

        data,
    );

    return chartOptions;
};
