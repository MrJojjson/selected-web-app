import { findIndex, identity, includes, map, max, min, propEq, reduce, sortBy } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../../../common/utils/dateFormat';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { modalToggleOpen } from '../../../redux';
import { getSpecificState } from '../../../redux/selectors/baseSelector';
import { StoreState } from '../../../redux/storeState';
import { SystemSortType } from '../../../redux/types/systemTypes';
import { Button, Header, Text } from '../../atoms';
import { Chip } from '../../atoms/chip';
import { Slider } from '../../atoms/slider';
import { setModal } from '../../molecules';

type FilterBarType = {
    id: keyof SystemSortType;
};

type FilterOptionsType = {
    id: string;
    type: string;
    values: string[];
    title: string;
};

const getMaxValue = (list: string[]) => reduce(max, -Infinity, list) as number;
const getMinValue = (list: string[]) => reduce(min, Infinity, list) as number;

export const FilterBar = ({ id }: FilterBarType) => {
    const { data } = getSpecificState({ page: id }) as StoreState[typeof id];
    const [filterOptions, setFilterOptions] = useState<FilterOptionsType[]>([]);
    const dispatch = useDispatch();

    const { mobile } = useWindowSize();
    useEffect(() => {
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
        setFilterOptions(filterOpt);
    }, [data]);

    const returnFilters = map(({ id, title, type, values }) => {
        if (values?.length <= 0) {
            return null;
        }
        let returnValues: JSX.Element | JSX.Element[] = [];
        if (type === 'number') {
            const max = getMaxValue(values);
            const min = getMinValue(values);
            returnValues = (
                <Slider
                    min={min}
                    max={max}
                    onMouseUpCapture={(value) => console.log('value', value)}
                    defaultMinValue={min}
                    defaultMaxValue={max}
                />
            );
        } else if (type === 'date') {
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

            returnValues = map(({ id, values }) => {
                return (
                    <li key={`${id}-${id}`}>
                        <Chip label={id} onClick={() => console.log('clicked chip')} />
                    </li>
                );
            }, newDates);
        } else {
            returnValues = map((value) => {
                return (
                    <li key={`${id}-${value}`}>
                        <Chip label={value} onClick={() => console.log('clicked chip')} active={type === 'text'} />
                    </li>
                );
            }, values);
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
