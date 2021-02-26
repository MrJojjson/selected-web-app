import React from 'react';
import { ExistingItem } from '../components/molecules/bars/existingItem';
import { NewItem } from '../components/molecules/bars/newItem/newItem';
import { PurchaseSpot } from '../components/molecules/spot/purchase';
import { PageLayout } from '../layout/pageLayout';

export const Purchases = () => {
    return (
        <PageLayout>
            <NewItem title="Add purchase" />
            <ExistingItem
                title="Cask and liqour"
                description="46900 sek - 600l"
                meta={new Date(2010, 7, 5).toISOString()}
                content={<PurchaseSpot />}
            />
        </PageLayout>
    );
};
