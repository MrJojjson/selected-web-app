import React from 'react';
import { useDispatch } from 'react-redux';
import { BarElement } from '../../../../layout/barLayout/bar';
import { purchaseIncomingSelected } from '../../../../redux';
import { Button } from '../../../atoms';

export const CaskNav = () => {
    const dispatch = useDispatch();

    const test = (
        <Button
            mini
            label="Cask"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    return <BarElement end={test} />;
};
