import { map } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setChartData } from '../../../redux/actions/chartActions';
import { ChartsType } from '../../../redux/types/chartTypes';
import { ApiSpiritVars } from '../../../types/spiritsTypes';
import { Dropdown, DropdownType } from '../../atoms';
import './bar.style.scss';

const xYOptions = map(
    ({ id, title }) => ({
        value: id,
        label: title,
    }),
    ApiSpiritVars,
);

const contentOptions = [
    {
        label: 'Spirit',
        value: 'spirit',
    },
    {
        label: 'Casks',
        value: 'cask',
    },
];

type ChartBarType = ChartsType;

export const ChartBar = ({ id, yAxis, xAxis, content }: ChartBarType) => {
    const dispatch = useDispatch();
    const contentDropDown = {
        label: 'Content:',
        options: contentOptions,
        defaultValue: content,
        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'content', value: currentTarget.value, id })),
    } as DropdownType;

    const xAxisDropDown = {
        label: 'X-Axis:',
        options: xYOptions,
        defaultValue: xAxis,
        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'xAxis', value: currentTarget.value, id })),
    } as DropdownType;

    const yAxisDropDown = {
        label: 'Y-Axis:',
        options: xYOptions,
        defaultValue: yAxis,
        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'yAxis', value: currentTarget.value, id })),
    } as DropdownType;

    return (
        <div className="chart_bar">
            <Dropdown {...contentDropDown} />

            <Dropdown {...xAxisDropDown} />
            <Dropdown {...yAxisDropDown} />
        </div>
    );
};
