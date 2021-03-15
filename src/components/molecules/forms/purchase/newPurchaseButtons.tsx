import React from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { purchaseIncomingAdded } from '../../../../redux';
import { Button } from '../../../atoms';
import './newPurchaseForms.style.scss';

export const NewPurchaseButtons = () => {
    const { mobile } = useWindowSize();
    const dispatch = useDispatch();
    const spirit = (
        <Button
            mini
            label="Spirit"
            theme="primary"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ spirit: true }))}
        />
    );
    const cask = (
        <Button
            mini
            label="Cask"
            theme="primary"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ cask: true }))}
        />
    );
    const spiritAndCask = (
        <Button
            mini
            label="Spirit and cask"
            theme="primary"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ spiritWithCask: true }))}
        />
    );

    return (
        <>
            <div className="new_purchase_add_buttons">
                {spiritAndCask}
                {spirit}
                {cask}
            </div>
        </>
    );
};
