import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../common/utils/dateFormat';
import { AddedWhiskiesForm } from '../components/molecules/forms/whiskies/addedWhiskiesForm';
import { SortBar } from '../components/organisms/bars/sortBar';
import { fetchData } from '../hooks/useApi';
import { CompLayout } from '../layout/compLayout';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState, whiskiesAddData, whiskiesSetFetch } from '../redux';
import { getSystemLayoutColumnsState } from '../redux/selectors/systemSelector';
import { getWhiskiesFetchState } from '../redux/selectors/whiskiesSelector';
import { WhiskiesDataType } from '../redux/types/whiskyTypes';
import {
    APIWhiskiesReturnType,
    ApiWhiskyVars,
    ApiWhiskyVarsType,
    WhiskyVars,
    WhiskyVarsType,
} from '../types/whiskyTypes';

export const Whiskies = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getWhiskiesFetchState();
    const columns = getSystemLayoutColumnsState({ page: 'whiskies' });

    useEffect(() => {
        if (fetch) {
            fetchData({
                endpoint: 'whiskies',
                token,
            })
                .then((res: APIWhiskiesReturnType[]) => {
                    if (!res?.message) {
                        dispatch(whiskiesSetFetch({ fetch: false }));
                        const data = map((rest) => {
                            const { id: uid, name: title, createdAtUtc = '---', updatedAtUtc = '---' } = rest;

                            const data = map(({ id, title, type }) => {
                                let whisky = { value: rest[id]?.toString(), id, title, type } as ApiWhiskyVarsType;
                                if (id === 'createdAtUtc' || id === 'updatedAtUtc') {
                                    whisky.disabled = true;
                                }
                                return whisky;
                            }, ApiWhiskyVars);

                            if (rest?.cask) {
                                data.push({
                                    id: 'cask',
                                    title: 'Cask name',
                                    type: 'text',
                                    value: rest?.cask?.number,
                                    belonging: 'cask',
                                });
                            }

                            const returnWhisky = {
                                data,
                                uid,
                                title,
                                description: `Created: ${DateFormatted({ date: createdAtUtc })}`,
                                meta: `Updated: ${DateFormatted({ date: updatedAtUtc })}`,
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
        <>
            <CompLayout key="added-whiskies-sort-bar">
                <SortBar id="whiskies" />
            </CompLayout>
            <PageLayout columns={columns} disableLayout>
                <AddedWhiskiesForm key="added-whiskies-form" />
            </PageLayout>
        </>
    );
};
