import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from '../components/atoms';
import { ExistingItem } from '../components/molecules/bars/existingItem';
import { WhiskySpot } from '../components/molecules/spot/whisky';
import { fetchData } from '../hooks/useApi';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState, whiskiesAddData, whiskiesSetFetch } from '../redux';
import { getWhiskiesState } from '../redux/selectors/whiskiesSelector';

export const Whisky = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    const { data = [], fetch } = getWhiskiesState();
    console.log('fetch', fetch);
    console.log('data', data);

    useEffect(() => {
        if (fetch) {
            fetchData({
                endpoint: 'whiskies',
                token,
            })
                .then((data) => {
                    dispatch(whiskiesSetFetch({ fetch: false }));
                    dispatch(whiskiesAddData({ data }));
                })
                .catch((err) => console.log('err', err));
        }
    }, [fetch]);

    const returnWhiskies = map(({ id, name, distillery, distilledDate }) => {
        return (
            <ExistingItem
                key={id}
                title={name}
                description={distillery}
                meta={distilledDate.toString()}
                content={<WhiskySpot />}
            />
        );
    }, data);

    return <PageLayout>{returnWhiskies}</PageLayout>;
};
