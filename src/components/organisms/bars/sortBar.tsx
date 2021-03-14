import { map } from 'ramda';
import React from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { StoreStateField } from '../../../redux/storeState';
import { ApiCaskVars } from '../../../types/caskTypes';
import { ApiSpiritVars } from '../../../types/spiritsTypes';
import { Dropdown, DropdownOptionType, DropdownType } from '../../atoms';
import './sortBar.style.scss';

type SortBarType = {
    id: StoreStateField;
};

const defaultValueOption: DropdownOptionType = {
    label: 'Sort by...',
    value: 'none',
};

const sortOrderOptions = [
    {
        value: 'ascend',
        label: 'Ascend',
    },
    {
        value: 'descend',
        label: 'Descend',
    },
];

export const SortBar = ({ id }: SortBarType) => {
    const { onQuerySearch, queryType } = useQuery({ storageKey: id, type: 'sort' });
    const { by, order } = queryType || {};
    let options = [] as DropdownOptionType[];
    switch (id) {
        case 'spirits':
            options = map(
                ({ id, title }) => ({
                    value: id,
                    label: title,
                }),
                ApiSpiritVars,
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
