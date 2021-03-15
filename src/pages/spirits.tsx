import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpirits } from '../api/fetchSpirits';
import { uniqueId } from '../common/utils/uniqueId';
import { Button, Text } from '../components/atoms';
import { setAlert } from '../components/molecules';
import { AddedSpiritsForm } from '../components/molecules/forms/spirits/addedSpiritsForm';
import { FilterBar } from '../components/organisms/bars/filterBar';
import { SortBar } from '../components/organisms/bars/sortBar';
import { BarElement } from '../layout/barLayout/bar';
import { CompLayout } from '../layout/compLayout';
import { PageLayout } from '../layout/pageLayout';
import {
    getAuthTokenState,
    setSystemError,
    spiritsAddData,
    spiritsExpandAll,
    spiritsSetFetch,
    systemAlertContent,
    systemAlertContentLog,
} from '../redux';
import { getSpiritsExpandAllState, getSpiritsFetchState } from '../redux/selectors/spiritsSelector';
import { getSystemLayoutColumnsState } from '../redux/selectors/systemSelector';

const Spirits = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getSpiritsFetchState();
    const expandAll = getSpiritsExpandAllState();
    const columns = getSystemLayoutColumnsState({ page: 'spirits' });

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchSpirits({ token });

            if (data) {
                dispatch(spiritsSetFetch({ fetch: false }));
                dispatch(spiritsAddData({ data }));
            } else if (error) {
                dispatch(systemAlertContentLog({ type: 'error', id: `${uniqueId('server-error')}`, value: error }));
            }
        };

        fetch && fetchData();
    }, [fetch]);

    const expandAllBtn = (
        <Button
            mini
            label="Expand All"
            icon={expandAll ? 'chevron-up' : 'chevron-down'}
            onClick={() => dispatch(spiritsExpandAll())}
        />
    );

    return (
        <>
            <CompLayout key="added-spirits-sort-bar" className="sort_filter_bar">
                <BarElement
                    start={<SortBar id="spirits" />}
                    end={
                        <>
                            <FilterBar id="spirits" />
                            {expandAllBtn}
                        </>
                    }
                />
            </CompLayout>
            <PageLayout columns={columns} disableLayout>
                <AddedSpiritsForm key="added-spirits-form" />
            </PageLayout>
        </>
    );
};

export default Spirits;
