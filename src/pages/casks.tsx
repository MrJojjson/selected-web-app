import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../common/utils/dateFormat';
import { AddedCasksForm } from '../components/molecules/forms/casks/addedCasksForm';
import { fetchData } from '../hooks/useApi';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState } from '../redux';
import { casksAddData, casksSetFetch } from '../redux/actions/casksActions';
import { getCasksFetchState } from '../redux/selectors/casksSelector';
import { CasksDataType } from '../redux/types/casksTypes';
import { APICaskReturnType, CaskVars, CaskVarsType } from '../types/caskTypes';

export const Casks = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getCasksFetchState();

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

                            const data = map(
                                ({ id, title, type }) => ({ value: rest[id], id, title, type } as CaskVarsType),
                                CaskVars,
                            );

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
        <PageLayout disableLayout>
            <AddedCasksForm key="added-casks-form" />
        </PageLayout>
    );
};
