import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddedWhiskiesForm } from '../components/molecules/forms/whiskies/addedWhiskiesForm';
import { fetchData } from '../hooks/useApi';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState, whiskiesAddData, whiskiesSetFetch } from '../redux';
import { getWhiskiesFetchState } from '../redux/selectors/whiskiesSelector';
import { WhiskiesDataType } from '../redux/types/whiskyTypes';
import { WhiskyVars, WhiskyVarsType } from '../types/whiskyTypes';

export const Whisky = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getWhiskiesFetchState();

    useEffect(() => {
        if (fetch) {
            fetchData({
                endpoint: 'whiskies',
                token,
            })
                .then((res) => {
                    if (!res?.message) {
                        dispatch(whiskiesSetFetch({ fetch: false }));
                        const data = map((rest) => {
                            const whisky = map(
                                ({ id, title, type }) => ({ value: rest[id], id, title, type } as WhiskyVarsType),
                                WhiskyVars,
                            );

                            const returnWhisky = {
                                data: whisky,
                                uid: rest.id,
                                title: rest.name,
                                description: rest.distillery,
                                meta: rest.distilledDate,
                            } as WhiskiesDataType;
                            return returnWhisky;
                        }, res);
                        dispatch(whiskiesAddData({ data }));
                    }
                })
                .catch((err) => console.log('err', err));
        }
    }, [fetch]);

    return (
        <PageLayout disableLayout>
            <AddedWhiskiesForm key="added-whiskies-form" />
        </PageLayout>
    );
};
