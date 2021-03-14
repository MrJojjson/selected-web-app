import { isEmpty, lensPath, map, mergeAll, set } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../../../hooks/useApi';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import {
    getAuthTokenState,
    getPurchaseIncomingState,
    purchaseIncomingSelected,
    spiritsSetFetch,
} from '../../../../redux';
import { PurchaseIncomingAddedState } from '../../../../redux/types/purchaseTypes';
import { UseApiType } from '../../../../types/apiTypes';
import { CaskType, APICaskReturnType } from '../../../../types/caskTypes';
import { SpiritType, APISpiritsReturnType } from '../../../../types/spiritsTypes';
import { Button } from '../../../atoms';
import { NavbarContentTemplate } from '../navbarContentTemplate';

const PurchaseNav = () => {
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

    type PostSpirit = {
        spirit: SpiritType;
        caskId?: CaskType['id'];
    };

    const postSpirit = async (data: PostSpirit, fetch: UseApiType): Promise<APISpiritsReturnType> => {
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
        dispatch(spiritsSetFetch({ fetch: true }));
        setTimeout(() => {
            dispatch(purchaseIncomingSelected({ remove: true }));
        }, 2500);
    };

    const onSubmit = () => {
        map(async ({ data: addedData, fetch, preFetch }) => {
            let spirit = mergeAll(
                map(({ id, value, belonging }) => {
                    if (belonging === 'spirit') {
                        return { [(id as unknown) as string]: value };
                    }
                }, addedData),
            ) as SpiritType;

            const cask = mergeAll(
                map(({ id, value, belonging }) => {
                    if (belonging === 'cask') {
                        return { [(id as unknown) as string]: value };
                    }
                }, addedData),
            ) as CaskType;

            if (!isEmpty(spirit) && !isEmpty(cask) && !isEmpty(preFetch)) {
                return postCask(cask, preFetch).then(async ({ id: caskId }) => {
                    spirit = set(lensPath(['spiritCask', 'id']), caskId, spirit);
                    await postSpirit({ spirit, caskId }, fetch);
                    resetIncomingPurchaseFields();
                });
            }
            if (!isEmpty(spirit)) {
                return postSpirit({ spirit }, fetch).then(async () => resetIncomingPurchaseFields());
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

export default PurchaseNav;
