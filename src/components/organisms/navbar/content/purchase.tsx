import React from 'react';
import { useDispatch } from 'react-redux';
import { Bar } from '../../../../layout/barLayout/bar';
import {
    getPurchaseIncomingSelectedState,
    puchaseIncomingSelected,
    getPurchaseIncomingAddedState,
    purchaseIncomingAdded,
} from '../../../../redux';
import { Button } from '../../../atoms';

export const PurchaseNav = () => {
    const dispatch = useDispatch();
    const selectedExists = getPurchaseIncomingSelectedState()?.length > 0;
    const addedExists = getPurchaseIncomingAddedState()?.length > 0;

    const add = (
        <Button
            mini
            label="Add new purchase"
            theme="highlight"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded())}
        />
    );

    const remove = (
        <Button
            mini
            label="Remove"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(puchaseIncomingSelected({ remove: true }))}
        />
    );

    const clear = (
        <Button
            mini
            label="Clear"
            theme="primary"
            icon="minus-square"
            onClick={() => dispatch(puchaseIncomingSelected({ clear: true }))}
        />
    );

    const archive = (
        <Button
            mini
            label="Archive"
            theme="primary"
            icon="archive"
            onClick={() => dispatch(puchaseIncomingSelected({ clear: true }))}
        />
    );

    const submit = (
        <Button
            mini
            label="Save"
            theme="highlight"
            icon="save"
            onClick={() => dispatch(puchaseIncomingSelected({ clear: true }))}
        />
    );

    const rightBar = (
        <>
            {selectedExists && remove}
            {selectedExists && archive}
            {selectedExists && clear}
            {addedExists && submit}
        </>
    );

    return <Bar left={add} right={rightBar} />;
};
