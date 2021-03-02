import { map } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from '../components/atoms';
import { ExistingItem } from '../components/molecules/bars/existingItem';
import { WhiskySpot } from '../components/molecules/spot/whisky';
import { fetchData } from '../hooks/useApi';
import { PageLayout } from '../layout/pageLayout';
import { getAuthTokenState, whiskiesAddData } from '../redux';
import { getWhiskiesAddState } from '../redux/selectors/whiskiesSelector';

export const Whisky = () => {
    const dispatch = useDispatch();
    const token = getAuthTokenState();
    useEffect(() => {
        fetchData({
            endpoint: 'whiskies',
            token,
        })
            .then((data) => dispatch(whiskiesAddData({ data })))
            .catch((err) => console.log('err', err));
    }, []);
    const whiskies = getWhiskiesAddState();

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
    }, whiskies);

    return <PageLayout>{returnWhiskies}</PageLayout>;
};
