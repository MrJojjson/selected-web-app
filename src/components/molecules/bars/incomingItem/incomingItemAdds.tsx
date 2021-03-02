import { map } from 'ramda';
import React from 'react';
import { Button, ButtonType } from '../../../atoms';

type IncomingItemAddsType = {
    onClick: (id: ButtonType['id']) => void;
};

export type IncomingItemListId = 'caskandliquor' | 'cask' | 'liqour';

const IncomingItemList: Omit<ButtonType, 'onClick' | 'id'> & { id: IncomingItemListId }[] = [
    {
        label: 'Add cask and liqour',
        icon: 'pallet',
        id: `caskandliquor`,
        theme: 'highlight',
    },
    {
        label: 'Add cask',
        icon: 'boxes',
        id: 'cask',
        theme: 'highlight',
    },
    {
        label: 'Add liqour',
        icon: 'flask',
        id: 'liqour',
        theme: 'highlight',
    },
];

export const IncomingItemAdds = ({ onClick }: IncomingItemAddsType) => {
    const returnItems = map(
        (item) => <Button key={item.id} onClick={() => onClick(item.id)} {...item} />,
        IncomingItemList,
    );

    return <>{returnItems}</>;
};
