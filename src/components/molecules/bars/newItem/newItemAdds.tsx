import { map } from 'ramda';
import React from 'react';
import { Button, ButtonType } from '../../../atoms';

type NewItemAddsType = {
    onClick: (id: ButtonType['id']) => void;
};

export type NewItemListId = 'caskandliquor' | 'cask' | 'liqour';

const newItemList: Omit<ButtonType, 'onClick' | 'id'> & { id: NewItemListId }[] = [
    {
        label: 'Add cask and liqour',
        icon: 'pallet',
        id: 'caskandliquor',
        theme: 'highlight',
    },
    {
        label: 'Add cask',
        icon: 'pallet',
        id: 'cask',
        theme: 'secondary',
    },
    {
        label: 'Add liqour',
        icon: 'flask',
        id: 'liqour',
    },
];

export const NewItemAdds = ({ onClick }: NewItemAddsType) => {
    const returnItems = map((item) => <Button key={item.id} onClick={() => onClick(item.id)} {...item} />, newItemList);

    return <>{returnItems}</>;
};
