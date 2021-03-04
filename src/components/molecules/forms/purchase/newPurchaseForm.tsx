import React from 'react';
import { useDispatch } from 'react-redux';
import { purchaseIncomingAdded, purchaseIncomingAddedData, purchaseIncomingSelected } from '../../../../redux';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../../redux/selectors/purchaseSelector';
import { Button } from '../../../atoms';
import { InputList } from '../lists/inputList';
import './newPurchaseForms.style.scss';

export const NewPurchaseForm = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();
    const dispatch = useDispatch();
    const whisky = (
        <Button
            label="Whisky"
            theme="highlight"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ whisky: true }))}
        />
    );
    const cask = (
        <Button
            label="Cask"
            theme="highlight"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({ cask: true }))}
        />
    );
    const whiskyAndCask = (
        <Button
            label="Whisky and cask"
            theme="highlight"
            icon="plus"
            onClick={() => dispatch(purchaseIncomingAdded({}))}
        />
    );
    if (added?.length <= 0) {
        return null;
    }

    return (
        <>
            <InputList
                data={added}
                selected={selected}
                onChangeSelect={(props) => purchaseIncomingSelected({ ...props })}
                onBlurInput={(props) => purchaseIncomingAddedData({ ...props })}
                title="New purchase"
                perElement
            />
            <div className="new_purchase_add_buttons">
                {whiskyAndCask}
                {whisky}
                {cask}
            </div>
        </>
    );
};
