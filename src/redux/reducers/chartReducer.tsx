import { findIndex, lensPath, propEq, set } from 'ramda';
import { ChartActions, ChartState, CHART_CHANGE_DATA } from '../types/chartTypes';

const initialState: ChartState = [
    {
        id: 'one',
        xAxis: 'name',
        yAxis: 'volume',
        y2Axis: 'ppm',
        content: 'spirits',
    },
];

export const ChartReducer = (state: ChartState = initialState, action: ChartActions) => {
    switch (action.type) {
        case CHART_CHANGE_DATA:
            const { id, type, value } = action?.payload;
            const index = findIndex(propEq('id', id))(state);
            return set(lensPath([index]), { ...state[index], [type]: value }, state);
        default:
            return state;
    }
};
