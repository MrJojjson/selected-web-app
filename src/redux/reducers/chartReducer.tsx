import { append, findIndex, includes, lensPath, propEq, reject, set, update, without } from 'ramda';
import { uniqueId } from '../../common/utils/uniqueId';
import { CaskNumberKeyType } from '../../types/caskTypes';
import { SpiritNumberKeyType } from '../../types/spiritsTypes';
import {
    ChartActions,
    ChartAxisNumberValueType,
    ChartState,
    ChartsType,
    CHART_ADD_NEW,
    CHART_ADD_NEW_LINE,
    CHART_CHANGE_DATA,
} from '../types/chartTypes';

const initialState: ChartState = [];

const defaultChart: ChartsType = {
    id: '',
    xAxis: 'name',
    graphs: [],
};

const defaultChartSpiritGraphs: SpiritNumberKeyType[] = ['abv', 'ola', 'ppm', 'volume'];
const defaultChartCaskGraphs: CaskNumberKeyType[] = ['size'];

export const ChartReducer = (state: ChartState = initialState, action: ChartActions) => {
    switch (action.type) {
        case CHART_ADD_NEW:
            defaultChart.id = uniqueId('chart');
            defaultChart.content = action?.payload?.content;
            defaultChart.type = action?.payload?.type;

            return append(defaultChart, state);
        case CHART_ADD_NEW_LINE:
            const i = findIndex(propEq('id', action?.payload?.id))(state);
            if (i === -1) return state;
            const { content, graphs, yAxis } = state[i] || {};

            let newLine: ChartAxisNumberValueType;
            let newLineBase: ChartAxisNumberValueType[] = without([yAxis], defaultChartSpiritGraphs);

            if (content === 'casks') newLineBase = without([yAxis], defaultChartCaskGraphs);

            newLine = reject((line) => includes(line, graphs), newLineBase)[0];

            if (newLine === undefined) return state;
            return set(lensPath([i, 'graphs']), [...graphs, newLine], state);
        case CHART_CHANGE_DATA:
            const { id, value, type } = action?.payload;
            const index = findIndex(propEq('id', id))(state);
            let newValue = { ...state[index], [action?.payload?.type]: value };
            if (type === 'content') {
                newValue = { ...newValue, graphs: [] };
            }
            if (type === 'graphs') {
                const graphs = state[index]?.graphs;
                const graphValue = value as ChartAxisNumberValueType;
                const lineIndex = graphs?.indexOf(graphValue);
                const newGraphs = update(lineIndex, graphValue, graphs);
                newValue = { ...newValue, graphs: newGraphs };
            }
            return set(lensPath([index]), newValue, state);
        default:
            return state;
    }
};
