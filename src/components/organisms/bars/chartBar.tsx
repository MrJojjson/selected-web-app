import { addIndex, map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNewChartLine, setChartData } from '../../../redux/actions/chartActions';
import { ChartAxisNumberValueType, ChartAxisValueType, ChartsType } from '../../../redux/types/chartTypes';
import { ApiCaskVars } from '../../../types/caskTypes';
import { InputVarsType } from '../../../types/inputTypes';
import { ApiSpiritVars } from '../../../types/spiritsTypes';
import { Button, Dropdown, DropdownType } from '../../atoms';
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

export const ChartBar = ({ id, yAxis, xAxis, content, graphs }: ChartBarType) => {
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

    const linesDropDowns = addIndex(map)((graph: ChartAxisNumberValueType, index) => {
        return (
            <Dropdown
                key={`${graph}-${index}`}
                label={`Graph ${index}`}
                options={yAxisDropDownOptions}
                defaultValue={graph}
                onOptionChange={({ currentTarget }) =>
                    dispatch(
                        setChartData({ type: 'graphs', value: currentTarget.value as ChartAxisNumberValueType, id }),
                    )
                }
            />
        );
    }, graphs);

    return (
        <div className="chart_bar">
            <div className="chart_bar_dropdowns">
                <Dropdown {...contentDropDown} />
                <Dropdown {...xAxisDropDown} />
                <Dropdown {...yAxisDropDown} />
                {linesDropDowns}
            </div>

            <Button
                mini
                className="chart_add_new_line_button"
                label="New graph"
                onClick={() => dispatch(addNewChartLine({ id }))}
            />
        </div>
    );
};
