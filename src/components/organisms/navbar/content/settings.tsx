import React from 'react';
import { useDispatch } from 'react-redux';
import { BarElement } from '../../../../layout/barLayout/bar';
import { purchaseIncomingSelected } from '../../../../redux';
import { Button } from '../../../atoms';

const SettingseNav = () => {
    const dispatch = useDispatch();

    const test = (
        <Button
            mini
            label="Settings"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    return <BarElement end={test} />;
};

export default SettingseNav;
