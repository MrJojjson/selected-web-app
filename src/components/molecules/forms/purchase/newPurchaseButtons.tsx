import React from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { purchaseIncomingAdded } from '../../../../redux';
import { Button } from '../../../atoms';
import './newPurchaseForms.style.scss';

export const NewPurchaseButtons = () => {
    const { mobile } = useWindowSize();
    const dispatch = useDispatch();
    const whisky = (
        <Button
            mini={mobile}
            label="Whisky"
            theme="primary"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ whisky: true }))}
        />
    );
    const cask = (
        <Button
            mini={mobile}
            label="Cask"
            theme="primary"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ cask: true }))}
        />
    );
    const whiskyAndCask = (
        <Button
            mini={mobile}
            label="Whisky and cask"
            theme="primary"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({}))}
        />
    );

    return (
        <>
            <div className="new_purchase_add_buttons">
                {whiskyAndCask}
                {whisky}
                {cask}
            </div>
        </>
    );
};
