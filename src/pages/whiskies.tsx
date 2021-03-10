import { map } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../common/utils/dateFormat';
import { Text } from '../components/atoms';
import { AddedWhiskiesForm } from '../components/molecules/forms/whiskies/addedWhiskiesForm';
import { FilterBar } from '../components/organisms/bars/filterBar';
import { SortBar } from '../components/organisms/bars/sortBar';
import { fetchData } from '../hooks/useApi';
import { CompLayout } from '../layout/compLayout';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState, whiskiesAddData, whiskiesSetFetch } from '../redux';
import { getSystemLayoutColumnsState } from '../redux/selectors/systemSelector';
import { getWhiskiesFetchState } from '../redux/selectors/whiskiesSelector';
import { WhiskiesDataType } from '../redux/types/whiskyTypes';
import { APIWhiskiesReturnType, ApiWhiskyVars, ApiWhiskyVarsType } from '../types/whiskyTypes';

export const Whiskies = () => {
    const [loading, setLoading] = useState<boolean>();
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const fetch = getWhiskiesFetchState();
    const columns = getSystemLayoutColumnsState({ page: 'whiskies' });

    useEffect(() => {
        if (fetch) {
            setLoading(true);

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
                        setLoading(false);
                    }
                })
                .catch((err) => console.log('err', err));
        }
    }, [fetch]);

    if (loading) {
        return <Text>Loading</Text>;
    }

    return (
        <>
            <CompLayout key="added-whiskies-sort-bar">
                <SortBar id="whiskies" />
                <FilterBar id="whiskies" />
            </CompLayout>
            <PageLayout columns={columns} disableLayout>
                <AddedWhiskiesForm key="added-whiskies-form" />
            </PageLayout>
        </>
    );
};
