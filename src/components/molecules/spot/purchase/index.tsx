import React from 'react';
import { getPurchaseIncomingAddedState } from '../../../../redux';
import { TableSpot } from '../table';
import './purchaseSpot.style.scss';

export const PurchaseSpot = () => {
    const added = getPurchaseIncomingAddedState();

    return <TableSpot headings={['Column 1', 'Column 2', 'Column 3', 'Column 4']} />;
};
