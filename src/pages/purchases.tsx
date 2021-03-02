import React from 'react';
import { ExistingItem } from '../components/molecules/bars/existingItem';
import { IncomingItem } from '../components/molecules/bars/incomingItem';
import { IncomingItemWhisky } from '../components/molecules/bars/incomingItem/incomingItemWhisky';
import { PurchaseSpot } from '../components/molecules/spot/purchase';
import { PageLayout } from '../layout/pageLayout';

export const Purchases = () => {
    return (
        <>
            <PageLayout>
                {/* <IncomingItem key="incoming_item" title="Add purchase" /> */}
                <IncomingItemWhisky />
                <ExistingItem
                    key="existing_item"
                    title="Cask and liqour"
                    description="46900 sek - 600l"
                    meta={new Date(2010, 7, 5).toISOString()}
                    content={<PurchaseSpot />}
                />
            </PageLayout>
        </>
    );
};
