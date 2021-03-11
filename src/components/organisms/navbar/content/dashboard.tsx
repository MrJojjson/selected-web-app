import React from 'react';
import { useDispatch } from 'react-redux';
import { BarElement } from '../../../../layout/barLayout/bar';
import Dashboard from '../../../../pages/dashboard';
import { purchaseIncomingSelected } from '../../../../redux';
import { Button } from '../../../atoms';

const DashboardNav = () => {
    const dispatch = useDispatch();

    const test = (
        <Button
            mini
            label="Dashboard"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    return <BarElement end={test} />;
};

export default Dashboard;
