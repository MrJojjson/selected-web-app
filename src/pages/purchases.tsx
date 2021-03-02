import React from 'react';
import { ExistingItem } from '../components/molecules/bars/existingItem';
import { IncomingItemWhisky } from '../components/molecules/bars/incomingItemWhisky';
import { PurchaseSpot } from '../components/molecules/spot/purchase';
import { PageLayout } from '../layout/pageLayout';

export const Purchases = () => {
    return (
        <PageLayout>
            <IncomingItemWhisky key="purchases-incoming-item" />
            <ExistingItem key="purchases-existing-item" content={<PurchaseSpot />} />
        </PageLayout>
    );
};
