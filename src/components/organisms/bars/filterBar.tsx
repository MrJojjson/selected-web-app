import { ParsedQuery } from 'query-string';
import { findIndex, includes, map, max, min, propEq, reduce } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../../../common/utils/dateFormat';
import { OnQuerySearchType, useQuery } from '../../../hooks/useQuery';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { modalToggleOpen } from '../../../redux';
import { getSpecificState } from '../../../redux/selectors/baseSelector';
import { StoreStateField } from '../../../redux/storeState';
import { CasksState } from '../../../redux/types/casksTypes';
import { WhiskiesState } from '../../../redux/types/whiskyTypes';
import { Button, Header } from '../../atoms';
import { Chip } from '../../atoms/chip';
import { Slider } from '../../atoms/slider';
import { setModal } from '../../molecules';

type FilterBarType = {
    id: StoreStateField;
};

type FilterOptionsType = {
    id: string;
    type: string;
    values: string[];
    title: string;
};

type FilterOptionsChange = Pick<FilterOptionsType, 'values' | 'id'> & {
    queryType?: ParsedQuery<string>;
    onQuerySearch: (props: OnQuerySearchType) => void;
};

const generetateFilterOptions = ({ data }) => {
    let filterOpt: FilterOptionsType[] = [];

    map(
        ({ data }) =>
            map(({ value, id, title, type }) => {
                if (value !== undefined && value !== null) {
                    const index = findIndex(propEq('id', id))(filterOpt);
                    if (index === -1) {
                        filterOpt = [...filterOpt, { id, type, title, values: [value] }];
                    } else if (index >= 0 && filterOpt[index] && !includes(value, filterOpt[index]?.values)) {
                        filterOpt[index].values = [...filterOpt[index].values, value];
                    }
                }
            }, data),
        data,
    );
    return filterOpt;
};

const returnFilterWithText = ({ id, values, queryType, onQuerySearch }: FilterOptionsChange) => {
    const textFilters = map((value) => {
        const active = includes(value, queryType[id] || []);
        return (
            <li key={`${id}-${value}`}>
                <Chip label={value} onClick={() => onQuerySearch({ key: id, value })} active={active} />
            </li>
        );
    }, values);
    return textFilters;
};

const returnFilterWithNumbers = ({ id, values, onQuerySearch }: FilterOptionsChange) => {
    const max = getMaxValue(values);
    const min = getMinValue(values);
    return (
        <Slider
            min={min}
            max={max}
            onMouseUpCapture={({ value, base }) => {
                return onQuerySearch({ key: id, valueArray: value, remove: base });
            }}
            defaultMinValue={min}
            defaultMaxValue={max}
        />
    );
};

const returnFilterWithDate = ({ id, values, queryType, onQuerySearch }: FilterOptionsChange) => {
    let newDates = [];

    map((value) => {
        if (value !== undefined && value !== null) {
            const year = DateFormatted({ date: value, options: { year: 'numeric' } });

            const index = findIndex(propEq('id', year))(newDates);

            if (index === -1) {
                newDates = [...newDates, { id: year, values: [value] }];
            } else if (index >= 0 && newDates[index]) {
                newDates[index].values = [...newDates[index].values, value];
            }
        }
    }, values);

    const dates = map(({ id: uid, values }) => {
        const active = includes(uid as string, queryType[id] || []);
        return (
            <li key={`${id}-${uid}`}>
                <Chip label={uid} active={active} onClick={() => onQuerySearch({ key: id, value: uid })} />
            </li>
        );
    }, newDates);

    return dates;
};

const getMaxValue = (list: string[]) => reduce(max, -Infinity, list) as number;
const getMinValue = (list: string[]) => reduce(min, Infinity, list) as number;

export const FilterBar = ({ id }: FilterBarType) => {
    const { data } = getSpecificState({ page: id }) as WhiskiesState | CasksState;
    const [filterOptions, setFilterOptions] = useState<FilterOptionsType[]>([]);
    const { queryType, onQuerySearch } = useQuery({ storageKey: id, type: 'filter' });
    const { mobile } = useWindowSize();

    const dispatch = useDispatch();

    useEffect(() => setFilterOptions(generetateFilterOptions({ data })), [data]);

    const returnFilters = map(({ id, title, type, values }) => {
        if (values?.length <= 0) {
            return null;
        }
        let returnValues: JSX.Element | JSX.Element[] = [];
        if (type === 'number') {
            returnValues = returnFilterWithNumbers({ id, values, onQuerySearch });
        } else if (type === 'date') {
            returnValues = returnFilterWithDate({ id, values, queryType, onQuerySearch });
        } else {
            returnValues = returnFilterWithText({ id, values, queryType, onQuerySearch });
        }

        return (
            <div key={id} className="filter_bar_wrapper">
                <Header className="filter_bar_list_header" fontSize="s">
                    {title}
                </Header>
                <ul className="filter_bar_list">{returnValues}</ul>
            </div>
        );
    }, filterOptions);

    return (
        <div className="filter_bar">
            <Button
                mini
                label={mobile ? '' : 'Filter'}
                theme="highlight"
                icon="filter"
                onClick={() => dispatch(modalToggleOpen({ contentType: 'filter' }))}
            />
            {setModal({
                id: 'modal_content',
                fromId: 'filter',
                content: <div className="filter_bar_modal">{returnFilters}</div>,
            })}
        </div>
    );
};
