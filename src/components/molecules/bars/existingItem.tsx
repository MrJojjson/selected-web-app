import React, { useState } from 'react';
import { BarLayout } from '../../../layout/barLayout';
import { Button } from '../../atoms';
import { BarsHeading } from './barsHeading';

type ExistingItemType = {
    content: JSX.Element | JSX.Element[];
};

export const ExistingItem = ({ content }: ExistingItemType) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    return (
        <BarLayout left={<BarsHeading title="Existing purchases" />} right={toggle} open={open}>
            {content}
        </BarLayout>
    );
};
