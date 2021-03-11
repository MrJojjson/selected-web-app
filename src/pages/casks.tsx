import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../common/utils/dateFormat';
import { AddedCasksForm } from '../components/molecules/forms/casks/addedCasksForm';
import { SortBar } from '../components/organisms/bars/sortBar';
import { fetchData } from '../hooks/useApi';
import { CompLayout } from '../layout/compLayout';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState } from '../redux';
import { casksAddData, casksSetFetch } from '../redux/actions/casksActions';
import { getCasksFetchState } from '../redux/selectors/casksSelector';
import { getSystemLayoutColumnsState } from '../redux/selectors/systemSelector';
import { CasksDataType } from '../redux/types/casksTypes';
import { APICaskReturnType, ApiCaskVars, ApiCaskVarsType, CaskVars, CaskVarsType } from '../types/caskTypes';

const Casks = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getCasksFetchState();
    const columns = getSystemLayoutColumnsState({ page: 'casks' });
    useEffect(() => {
        if (fetch) {
            fetchData({
                endpoint: 'casks',
                token,
            })
                .then((res: APICaskReturnType[]) => {
                    if (!res?.message) {
                        dispatch(casksSetFetch({ fetch: false }));
                        const data = map((rest) => {
                            const { id: uid, number: title, createdAtUtc = '---', updatedAtUtc = '---' } = rest;

                            const data = map(({ id, title, type }) => {
                                let whisky = { value: rest[id]?.toString(), id, title, type } as ApiCaskVarsType;
                                if (id === 'createdAtUtc' || id === 'updatedAtUtc') {
                                    whisky.disabled = true;
                                }
                                return whisky;
                            }, ApiCaskVars);

                            if (rest?.whisky) {
                                data.push({
                                    id: 'whisky',
                                    title: 'Whisky name',
                                    type: 'text',
                                    value: rest?.whisky?.name,
                                    belonging: 'whisky',
                                });
                            }

                            const returnCasks = {
                                data,
                                uid,
                                title,
                                description: `Created: ${DateFormatted({ date: createdAtUtc })}`,
                                meta: `Updated: ${DateFormatted({ date: updatedAtUtc })}`,
                            } as CasksDataType;

                            return returnCasks;
                        }, res);
                        dispatch(casksAddData({ data }));
                    }
                })
                .catch((err) => console.log('err', err));
        }
    }, [fetch]);

    return (
        <>
            <CompLayout key="added-casks-sort-bar">
                <SortBar id="casks" />
            </CompLayout>
            <PageLayout columns={columns} disableLayout>
                <AddedCasksForm key="added-casks-form" />
            </PageLayout>
        </>
    );
};

export default Casks;
