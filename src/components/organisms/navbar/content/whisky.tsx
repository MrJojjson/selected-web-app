import React from 'react';
import { useDispatch } from 'react-redux';
import { Bar } from '../../../../layout/barLayout/bar';
import { purchaseIncomingSelected } from '../../../../redux';
import { Button } from '../../../atoms';

export const WhiskyNav = () => {
    const dispatch = useDispatch();

    const test = (
        <Button
            mini
            label="Whisky"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    return <Bar left={test} />;
};
