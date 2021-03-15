import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCasks } from '../api/fetchCasks';
import { uniqueId } from '../common/utils/uniqueId';
import { Button } from '../components/atoms';
import { AddedCasksForm } from '../components/molecules/forms/casks/addedCasksForm';
import { FilterBar } from '../components/organisms/bars/filterBar';
import { SortBar } from '../components/organisms/bars/sortBar';
import { BarElement } from '../layout/barLayout/bar';
import { CompLayout } from '../layout/compLayout';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState, systemAlertContentLog } from '../redux';
import { casksAddData, casksExpandAll, casksSetFetch } from '../redux/actions/casksActions';
import { getCasksExpandAllState, getCasksFetchState } from '../redux/selectors/casksSelector';
import { getSystemLayoutColumnsState } from '../redux/selectors/systemSelector';

const Casks = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getCasksFetchState();
    const expandAll = getCasksExpandAllState();
    const columns = getSystemLayoutColumnsState({ page: 'casks' });
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchCasks({ token });
            if (data) {
                dispatch(casksSetFetch({ fetch: false }));
                dispatch(casksAddData({ data }));
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
            onClick={() => dispatch(casksExpandAll())}
        />
    );

    return (
        <>
            <CompLayout key="added-casks-sort-bar">
                <BarElement
                    start={<SortBar id="casks" />}
                    end={
                        <>
                            <FilterBar id="casks" />
                            {expandAllBtn}
                        </>
                    }
                />
            </CompLayout>
            <PageLayout columns={columns} disableLayout>
                <AddedCasksForm key="added-casks-form" />
            </PageLayout>
        </>
    );
};

export default Casks;
