import React, { useState } from 'react';
import { BarLayout } from '../../../layout/barLayout';
import { Button } from '../../atoms';
import { BarsHeading, BarsHeadingType } from './barsHeading';

type ExistingItemType = BarsHeadingType & {
    content: JSX.Element | JSX.Element[];
};

export const ExistingItem = ({ content, ...rest }: ExistingItemType) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    return (
        <BarLayout left={<BarsHeading {...rest} />} right={toggle} open={open}>
            {content}
        </BarLayout>
    );
};
