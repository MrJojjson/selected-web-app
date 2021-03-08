import { map } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSystemSort } from '../../../redux';
import { getSystemSortState } from '../../../redux/selectors/systemSelector';
import { SystemSortType } from '../../../redux/types/systemTypes';
import { ApiCaskVars, ApiCaskVarsType } from '../../../types/caskTypes';
import { ApiWhiskyVars, ApiWhiskyVarsType } from '../../../types/whiskyTypes';
import { Dropdown, DropdownOptionType, DropdownType } from '../../atoms';
import './sortBar.style.scss';

type SortBarType = {
    id: keyof SystemSortType;
};

const sortOrderOptions = [
    {
        value: 'descend',
        label: 'Descend',
    },
    {
        value: 'ascend',
        label: 'Ascend',
    },
];

export const SortBar = ({ id }: SortBarType) => {
    const { type, order } = getSystemSortState({ page: id });
    const dispatch = useDispatch();
    let options = [] as DropdownOptionType[];
    switch (id) {
        case 'whiskies':
            options = map(
                ({ id, title }) => ({
                    value: id,
                    label: title,
                }),
                ApiWhiskyVars,
            );
            break;
        case 'casks':
            options = map(
                ({ id, title }) => ({
                    value: id,
                    label: title,
                }),
                ApiCaskVars,
            );
        default:
            break;
    }
    const sortByDropDown = {
        label: 'Sort by:',
        options,
        defaultValue: type,
        onOptionChange: ({ currentTarget }) =>
            dispatch(
                setSystemSort({
                    type: id,
                    value: currentTarget.value as SystemSortType[typeof id]['type'],
                }),
            ),
    } as DropdownType;

    const orderDropDown = {
        label: 'Order:',
        options: sortOrderOptions,
        defaultValue: order,
        onOptionChange: ({ currentTarget }) =>
            dispatch(
                setSystemSort({
                    type: id,
                    order: currentTarget.value as SystemSortType[typeof id]['order'],
                }),
            ),
    } as DropdownType;
    return (
        <div className="sort_bar">
            <Dropdown {...sortByDropDown} />
            <Dropdown {...orderDropDown} />
        </div>
    );
};
