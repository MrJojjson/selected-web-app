import React from 'react';
import { NewPurchaseForm } from '../components/molecules/forms/purchase/newPurchaseForm';
import { PageLayout } from '../layout/pageLayout';

export const Purchases = () => {
    return (
        <PageLayout>
            <NewPurchaseForm key="purchases-incoming-item" />
        </PageLayout>
    );
};
