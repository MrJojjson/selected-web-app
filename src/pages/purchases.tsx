import React from 'react';
import { ExistingItem } from '../components/molecules/bars/existingItem';
import { NewItem } from '../components/molecules/bars/newItem';
import { PurchaseSpot } from '../components/molecules/spot/purchase';
import { PageLayout } from '../layout/pageLayout';

export const Purchases = () => {
    return (
        <PageLayout>
            <NewItem />
            <ExistingItem />
            <PurchaseSpot />
        </PageLayout>
    );
};
