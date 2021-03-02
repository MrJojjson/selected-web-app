import React from 'react';
import { useDispatch } from 'react-redux';
import { getPurchaseIncomingSelectedState, puchaseIncomingSelected, purchaseIncomingAdded } from '../../../../redux';
import { Button } from '../../../atoms';

export const PurchaseNav = () => {
    const dispatch = useDispatch();
    const selectedExists = getPurchaseIncomingSelectedState()?.length > 0;

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
            theme="secondary"
            icon="minus-square"
            onClick={() => dispatch(puchaseIncomingSelected({ clear: true }))}
        />
    );

    return (
        <>
            <Button
                mini
                label="Add new purchase"
                theme="secondary"
                icon="plus"
                onClick={() => dispatch(purchaseIncomingAdded())}
            />
            {selectedExists && (
                <>
                    {remove}
                    {clear}
                </>
            )}
        </>
    );
};
