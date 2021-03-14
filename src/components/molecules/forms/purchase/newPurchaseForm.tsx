import React from 'react';
import { purchaseIncomingAddedData, purchaseIncomingSelected } from '../../../../redux';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../../redux/selectors/purchaseSelector';
import { Header } from '../../../atoms';
import { InputList } from '../lists/inputList';
import { NewPurchaseButtons } from './newPurchaseButtons';
import './newPurchaseForms.style.scss';

export const NewPurchaseForm = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();

    return (
        <InputList
            data={added}
            selected={selected}
            onChangeSelect={(props) => purchaseIncomingSelected({ ...props })}
            onBlurInput={(props) => purchaseIncomingAddedData({ ...props })}
            title="New purchase"
            perElement
            start={
                <div className="new_purchase_title">
                    <Header className="title" oneLine>
                        New purchase
                    </Header>
                    <NewPurchaseButtons />
                </div>
            }
        />
    );
};
