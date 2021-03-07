import React from 'react';
import { purchaseIncomingAddedData, purchaseIncomingSelected } from '../../../../redux';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../../redux/selectors/purchaseSelector';
import { InputList } from '../lists/inputList';
import './newPurchaseForms.style.scss';

export const NewPurchaseForm = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();
    if (added?.length <= 0) {
        return null;
    }

    return (
        <InputList
            data={added}
            selected={selected}
            onChangeSelect={(props) => purchaseIncomingSelected({ ...props })}
            onBlurInput={(props) => purchaseIncomingAddedData({ ...props })}
            title="New purchase"
            perElement
        />
    );
};
