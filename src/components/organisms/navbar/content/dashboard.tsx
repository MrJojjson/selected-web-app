import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewChart } from '../../../../redux/actions/chartActions';
import { ChartAvailableContentType, ChartAvailableType } from '../../../../redux/types/chartTypes';
import { Button, Dropdown } from '../../../atoms';
import { NavbarContentTemplate } from '../navbarContentTemplate';

type OptionsType<T> = {
    label: string;
    value: T;
};

const typeOptions: OptionsType<NewChartType['type']>[] = [
    {
        label: 'Areachart',
        value: 'area',
    },
    {
        label: 'Linechart',
        value: 'line',
    },
];

const contentOptions: OptionsType<NewChartType['content']>[] = [
    {
        label: 'Spirits',
        value: 'spirits',
    },
    {
        label: 'Casks',
        value: 'casks',
    },
];

type NewChartType = {
    type: ChartAvailableType;
    content: ChartAvailableContentType;
};

const DashboardNav = () => {
    const [newChart, setNewChart] = useState<NewChartType>({ type: 'line', content: 'spirits' });
    const dispatch = useDispatch();

    const add = <Button mini label="Add chart" onClick={() => dispatch(addNewChart({ type, content }))} />;

    const typeDropdown = (
        <Dropdown
            mini
            label={`Type:`}
            options={typeOptions}
            defaultValue={newChart?.type}
            onOptionChange={({ currentTarget }) =>
                setNewChart({ ...newChart, type: currentTarget.value as ChartAvailableType })
            }
        />
    );
    const contentDropdown = (
        <Dropdown
            mini
            label={`Content:`}
            options={contentOptions}
            defaultValue={newChart?.content}
            onOptionChange={({ currentTarget }) =>
                setNewChart({ ...newChart, content: currentTarget.value as ChartAvailableContentType })
            }
        />
    );
    const { type, content } = newChart || {};

    return (
        <NavbarContentTemplate
            start={
                <>
                    {typeDropdown}
                    {contentDropdown}
                </>
            }
            end={add}
        />
    );
};

export default DashboardNav;
