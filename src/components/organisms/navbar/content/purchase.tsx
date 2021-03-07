import { map, mergeAll } from 'ramda';
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

    const onSubmit = () => {
        map(async ({ data: addedData, fetch }) => {
            const data = mergeAll(map(({ id, value }) => ({ [(id as unknown) as string]: value }), addedData));

            await fetchData({
                data,
                token,
                ...fetch,
            })
                .then((res) => {
                    dispatch(purchaseIncomingSelected({ all: true }));
                    dispatch(whiskiesSetFetch({ fetch: true }));
                    setTimeout(() => {
                        dispatch(purchaseIncomingSelected({ remove: true }));
                    }, 2500);
                })
                .catch((err) => console.log('err', err));
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
