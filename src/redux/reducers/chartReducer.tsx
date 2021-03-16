import { append, findIndex, includes, lensPath, propEq, reject, set, update, without } from 'ramda';
import { uniqueId } from '../../common/utils/uniqueId';
import {
    ChartActions,
    ChartAxisNumberValueType,
    ChartState,
    ChartsType,
    CHART_ADD_NEW,
    CHART_CHANGE_DATA,
} from '../types/chartTypes';

const initialState: ChartState = [];

const defaultChart: ChartsType = {
    id: '',
    xAxis: 'name',
    graphs: [],
};

export const ChartReducer = (state: ChartState = initialState, action: ChartActions) => {
    switch (action.type) {
        case CHART_ADD_NEW:
            defaultChart.id = uniqueId('chart');
            defaultChart.content = action?.payload?.content;
            defaultChart.type = action?.payload?.type;

            return append(defaultChart, state);
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
                const exists = includes(value, graphs);
                const newGraphs: ChartAxisNumberValueType[] = exists
                    ? without([graphValue], graphs)
                    : [...graphs, graphValue];
                newValue = { ...newValue, graphs: newGraphs };
            }
            return set(lensPath([index]), newValue, state);
        default:
            return state;
    }
};
