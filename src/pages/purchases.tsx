import React from 'react';
import { NewPurchaseButtons } from '../components/molecules/forms/purchase/newPurchaseButtons';
import { NewPurchaseForm } from '../components/molecules/forms/purchase/newPurchaseForm';
import { PageLayout } from '../layout/pageLayout';

export const Purchases = () => {
    return (
        <PageLayout>
            <NewPurchaseButtons key="purchases-incoming-buttons" />
            <NewPurchaseForm key="purchases-incoming-item" />
        </PageLayout>
    );
};
