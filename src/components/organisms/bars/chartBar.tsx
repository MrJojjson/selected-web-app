import { includes, map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChartData } from '../../../redux/actions/chartActions';
import { ChartAxisNumberValueType, ChartAxisValueType, ChartsType } from '../../../redux/types/chartTypes';
import { ApiCaskVars } from '../../../types/caskTypes';
import { InputVarsType } from '../../../types/inputTypes';
import { ApiSpiritVars } from '../../../types/spiritsTypes';
import { Dropdown, DropdownType } from '../../atoms';
import { Selector } from '../../atoms/selectors';
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

export const ChartBar = ({ id, yAxis, xAxis, content, graphsTypes, graphs }: ChartBarType) => {
    const dispatch = useDispatch();

    let data: xYOptionsType['data'] = ApiSpiritVars;
    if (content === 'casks') {
        data = ApiCaskVars;
    }

    const xAxisDropDownOptions = xOptions({ data });
    const yAxisDropDownOptions = yOptions({ data });

    useEffect(() => {
        dispatch(setChartData({ type: 'xAxis', value: xAxisDropDownOptions[0].value as ChartAxisValueType, id }));
        dispatch(setChartData({ type: 'yAxis', value: yAxisDropDownOptions[0].value as ChartAxisValueType, id }));
    }, [content]);

    const contentDropDown = {
        label: 'Content:',
        options: contentOptions,
        defaultValue: content,
        onOptionChange: ({ currentTarget }) => {
            dispatch(setChartData({ type: 'content', value: currentTarget.value as ChartAxisValueType, id }));
        },
    } as DropdownType;

    const xAxisDropDown = {
        label: 'X-Axis:',
        options: xAxisDropDownOptions,
        defaultValue: xAxis,

        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'xAxis', value: currentTarget.value as ChartAxisValueType, id })),
    } as DropdownType;

    const yAxisDropDown = {
        label: 'Y-Axis:',
        options: yAxisDropDownOptions,
        defaultValue: yAxis,
        onOptionChange: ({ currentTarget }) =>
            dispatch(setChartData({ type: 'yAxis', value: currentTarget.value as ChartAxisNumberValueType, id })),
    } as DropdownType;

    const linesSelectors = map(({ value, label }) => {
        return (
            <Selector
                checked={includes(value, graphs)}
                key={label}
                label={label}
                disabled={yAxis === value}
                onChange={() => dispatch(setChartData({ type: 'graphs', value: value as ChartAxisValueType, id }))}
            />
        );
    }, yAxisDropDownOptions);

    return (
        <div className="chart_bar">
            <div className="chart_bar_dropdowns">
                <Dropdown {...contentDropDown} />
                <Dropdown {...xAxisDropDown} />
                <Dropdown {...yAxisDropDown} />
            </div>
            <div className="chart_bar_selectors">{linesSelectors}</div>
        </div>
    );
};
