import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChartData } from '../../../redux/actions/chartActions';
import { ChartsType } from '../../../redux/types/chartTypes';
import { ApiCaskVars } from '../../../types/caskTypes';
import { InputVarsType } from '../../../types/inputTypes';
import { ApiSpiritVars } from '../../../types/spiritsTypes';
import { Dropdown, DropdownType } from '../../atoms';
import './bar.style.scss';

type xYOptionsType = {
    data: InputVarsType[];
};

const xOptions = ({ data }: xYOptionsType) =>
    map(({ id, title, type }) => {
        if (type !== 'number') {
            return {
                value: id,
                label: title,
            };
        }
    }, data).filter((data) => data);

const yOptions = ({ data }: xYOptionsType) =>
    map(({ id, title, type }) => {
        if (type === 'number') {
            return {
                value: id,
                label: title,
            };
        }
    }, data).filter((data) => data);

const contentOptions = [
    {
        label: 'Spirits',
        value: 'spirits',
    },
    {
        label: 'Casks',
        value: 'casks',
    },
];

type ChartBarType = ChartsType;

export const ChartBar = ({ id, yAxis, xAxis, content }: ChartBarType) => {
    const dispatch = useDispatch();

    let data: xYOptionsType['data'] = ApiSpiritVars;
    if (content === 'casks') {
        data = ApiCaskVars;
    }

    const xAxisDropDownOptions = xOptions({ data });
    const yAxisDropDownOptions = yOptions({ data });

    useEffect(() => {
        dispatch(setChartData({ type: 'xAxis', value: xAxisDropDownOptions[0].value, id }));
        dispatch(setChartData({ type: 'yAxis', value: yAxisDropDownOptions[0].value, id }));
    }, [content]);

    const contentDropDown = {
        label: 'Content:',
        options: contentOptions,
        defaultValue: content,
        onOptionChange: ({ currentTarget }) => {
            dispatch(setChartData({ type: 'content', value: currentTarget.value, id }));
        },
    } as DropdownType;

    const xAxisDropDown = {
        label: 'X-Axis:',
        options: xAxisDropDownOptions,
        defaultValue: xAxis,

        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'xAxis', value: currentTarget.value, id })),
    } as DropdownType;

    const ySecondAxisDropDown = {
        label: 'X-Axis:',
        options: yAxisDropDownOptions,
        defaultValue: xAxis,
        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'y2Axis', value: currentTarget.value, id })),
    } as DropdownType;

    const yAxisDropDown = {
        label: 'Y-Axis:',
        options: yAxisDropDownOptions,
        defaultValue: yAxis,
        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'yAxis', value: currentTarget.value, id })),
    } as DropdownType;

    return (
        <div className="chart_bar">
            <Dropdown {...contentDropDown} />
            <Dropdown {...xAxisDropDown} />
            <Dropdown {...ySecondAxisDropDown} />
            <Dropdown {...yAxisDropDown} />
        </div>
    );
};
