import { map } from 'ramda';
import React from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { purchaseIncomingAddedData, purchaseIncomingSelected } from '../../../../redux';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../../redux/selectors/purchaseSelector';
import { WhiskyList } from '../lists/whiskyList';

export const NewPurchaseForm = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();

    const returnWhiskies = map(({ uid, data, ...rest }) => {
        return (
            <CompLayout key={uid}>
                <WhiskyList
                    uid={uid}
                    data={[{ data, uid }]}
                    selected={selected}
                    onChangeSelect={(props) => purchaseIncomingSelected({ ...props })}
                    onBlurInput={(props) => purchaseIncomingAddedData({ ...props })}
                    onChangeWorkingTitle={(props) => console.log('props', props)}
                    {...rest}
                />
            </CompLayout>
        );
    }, added);
    return <>{returnWhiskies}</>;

    // return (
    //     <WhiskyList
    //         data={added}
    //         selected={selected}
    //         onChangeSelect={(props) => purchaseIncomingSelected({ ...props })}
    //         onBlurInput={(props) => purchaseIncomingAddedData({ ...props })}
    //         onChangeWorkingTitle={(props) => console.log('props', props)}
    //         title="New purchase"
    //     />
    // );
};
