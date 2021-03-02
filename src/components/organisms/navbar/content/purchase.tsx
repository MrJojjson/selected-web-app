import React from 'react';
import { useDispatch } from 'react-redux';
import { Bar } from '../../../../layout/barLayout/bar';
import { purchaseIncomingSelected, purchaseIncomingAdded, getPurchaseIncomingState } from '../../../../redux';
import { Button } from '../../../atoms';

export const PurchaseNav = () => {
    const dispatch = useDispatch();
    const { selected, added } = getPurchaseIncomingState();

    const selectedExists = selected?.length > 0;
    const addedExists = added?.length > 0;

    const allSelected = selected?.length === added.length;

    const add = (
        <Button mini label="Purchase" theme="highlight" icon="plus" onClick={() => dispatch(purchaseIncomingAdded())} />
    );

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

    const archive = (
        <Button
            mini
            label="Archive"
            theme="primary"
            icon="archive"
            onClick={() => dispatch(purchaseIncomingSelected({ clear: true }))}
        />
    );

    const submit = (
        <Button
            mini
            label="Save"
            theme="highlight"
            icon="save"
            onClick={() => dispatch(purchaseIncomingSelected({ clear: true }))}
        />
    );

    const rightBar = (
        <>
            {selectedExists && remove}
            {selectedExists && archive}
            {selectedExists && !allSelected && clear}
            {addedExists && selectAll}
            {addedExists && submit}
        </>
    );

    return <Bar left={add} right={rightBar} />;
};
