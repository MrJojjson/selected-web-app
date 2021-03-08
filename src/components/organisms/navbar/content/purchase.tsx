import { isEmpty, lensPath, map, mergeAll, set } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../../hooks/useApi';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import {
    getAuthTokenState,
    getPurchaseIncomingState,
    purchaseIncomingSelected,
    whiskiesSetFetch,
} from '../../../../redux';
import { PurchaseIncomingAddedState } from '../../../../redux/types/purchaseTypes';
import { UseApiType } from '../../../../types/apiTypes';
import { CaskType, APICaskReturnType } from '../../../../types/caskTypes';
import { WhiskyType, APIWhiskiesReturnType } from '../../../../types/whiskyTypes';
import { Button } from '../../../atoms';
import { NavbarContentTemplate } from '../navbarContentTemplate';

export const PurchaseNav = () => {
    const dispatch = useDispatch();
    const { selected, added } = getPurchaseIncomingState();
    const token = getAuthTokenState();

    const selectedExists = selected?.length > 0;
    const addedExists = added?.length > 0;

    const allSelected = selected?.length === added.length;

    const selectAll = (
        <Button
            mini
            label={allSelected ? 'Deselect all' : 'Select all'}
            theme="secondary"
            icon={allSelected ? 'minus-square' : 'plus-square'}
            onClick={() => dispatch(purchaseIncomingSelected({ all: !allSelected }))}
        />
    );

    const remove = (
        <Button
            mini
            label="Remove"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    const clear = (
        <Button
            mini
            label="Clear selected"
            theme="primary"
            icon="minus-square"
            onClick={() => dispatch(purchaseIncomingSelected({ clear: true }))}
        />
    );

    const postWhisky = async (data: WhiskyType, fetch: UseApiType): Promise<APIWhiskiesReturnType> => {
        return await fetchData({
            data,
            token,
            ...fetch,
        })
            .then((res) => res)
            .catch((err) => console.log('err', err));
    };

    const postCask = async (data: CaskType, fetch: UseApiType): Promise<APICaskReturnType> => {
        return await fetchData({
            data,
            token,
            ...fetch,
        })
            .then((res) => res)
            .catch((err) => console.log('err', err));
    };

    const resetIncomingPurchaseFields = () => {
        dispatch(purchaseIncomingSelected({ all: true }));
        dispatch(whiskiesSetFetch({ fetch: true }));
        setTimeout(() => {
            dispatch(purchaseIncomingSelected({ remove: true }));
        }, 2500);
    };

    const onSubmit = () => {
        map(async ({ data: addedData, fetch, preFetch }) => {
            let whisky = mergeAll(
                map(({ id, value, belonging }) => {
                    if (belonging === 'whisky') {
                        return { [(id as unknown) as string]: value };
                    }
                }, addedData),
            ) as WhiskyType;

            const cask = mergeAll(
                map(({ id, value, belonging }) => {
                    if (belonging === 'cask') {
                        return { [(id as unknown) as string]: value };
                    }
                }, addedData),
            ) as CaskType;

            if (!isEmpty(whisky) && !isEmpty(cask) && !isEmpty(preFetch)) {
                return postCask(cask, preFetch).then(async ({ id }) => {
                    whisky = set(lensPath(['cask', 'id']), id, whisky);
                    await postWhisky(whisky, fetch);
                    resetIncomingPurchaseFields();
                });
            }
            if (!isEmpty(whisky)) {
                return postWhisky(whisky, fetch).then(async () => resetIncomingPurchaseFields());
            }
            if (!isEmpty(cask)) {
                return postCask(cask, fetch).then(async () => resetIncomingPurchaseFields());
            }
        }, added);
    };

    const submit = <Button mini label="Save" theme="highlight" icon="save" onClick={onSubmit} />;

    const startBar = (
        <>
            {addedExists && selectAll}
            {selectedExists && !allSelected && clear}
            {selectedExists && remove}
        </>
    );

    const endBar = <>{addedExists && submit}</>;

    return <NavbarContentTemplate start={startBar} end={endBar} />;
};
