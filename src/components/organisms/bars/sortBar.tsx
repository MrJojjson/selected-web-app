import { isEmpty, map } from 'ramda';
import React from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { getSystemSortState } from '../../../redux/selectors/systemSelector';
import { SystemSortType } from '../../../redux/types/systemTypes';
import { ApiCaskVars } from '../../../types/caskTypes';
import { ApiWhiskyVars } from '../../../types/whiskyTypes';
import { Dropdown, DropdownOptionType, DropdownType } from '../../atoms';
import './sortBar.style.scss';

type SortBarType = {
    id: keyof SystemSortType;
};

const defaultValueOption: DropdownOptionType = {
    label: 'Sort by...',
    value: 'none',
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
    const { onQuerySearch, queryType } = useQuery({ storageKey: id, type: 'sort' });
    const { by, order } = queryType || {};
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

    options.unshift(defaultValueOption);

    const sortByDropDown = {
        label: 'Sort by:',
        options,
        defaultValue: by,
        onOptionChange: ({ currentTarget }) => {
            onQuerySearch({ key: 'by', value: currentTarget.value, remove: currentTarget.value === 'none' });
        },
    } as DropdownType;

    const orderDropDown = {
        label: 'Order:',
        options: sortOrderOptions,
        defaultValue: order || 'descend',
        onOptionChange: ({ currentTarget }) => onQuerySearch({ key: 'order', value: currentTarget.value }),
    } as DropdownType;

    return (
        <div className="sort_bar">
            <Dropdown {...sortByDropDown} />
            {by !== undefined && <Dropdown {...orderDropDown} />}
        </div>
    );
};
