import { map } from 'ramda';
import React, { useEffect, useState } from 'react';
import { BarLayout } from '../../../../layout/barLayout';
import { Button, Header } from '../../../atoms';
import { BarsHeadingType } from '../barsHeading';
import { NewItemAdds, NewItemListId } from './newItemAdds';
type NewItemType = BarsHeadingType;

type NewAddedItemType = {
    title: string;
    content: JSX.Element;
};

export const NewItem = ({ ...rest }: NewItemType) => {
    const [items, setItems] = useState<NewAddedItemType[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => items?.length > 0 && setOpen(true), [items]);
    const toggle = (
        <Button
            mini
            label={open ? 'Hide new purchase' : 'Show new purchase'}
            icon={open ? 'chevron-up' : 'chevron-down'}
            onClick={() => setOpen(!open)}
        />
    );

    const addNewItem = async (id: NewItemListId) => {
        let item: NewAddedItemType = null;
        if (id === 'caskandliquor') {
            const { CaskAndLiquourTemplate } = await import('./newItemTemplate');
            item = {
                title: 'New cask and liquor',
                content: <CaskAndLiquourTemplate />,
            };
        } else if (id === 'cask') {
            const { CaskTemplate } = await import('./newItemTemplate');
            item = {
                title: 'New cask',
                content: <CaskTemplate />,
            };
        } else if (id === 'liqour') {
            const { LiquourTemplate } = await import('./newItemTemplate');
            item = {
                title: 'New liquor',
                content: <LiquourTemplate />,
            };
        }

        setItems([...items, item]);
    };

    const returnItems = map(
        ({ title, content }) => (
            <div className="bars_new_item">
                <Header fontSize="s" className="bars_new_item_title">
                    {title}
                </Header>
                <div className="bars_new_item_content">{content}</div>
            </div>
        ),
        items,
    );

    const submit = <Button label="Add purchase" theme="highlight" icon="plus" onClick={() => {}} />;

    return (
        <BarLayout
            left={<NewItemAdds onClick={(id: NewItemListId) => addNewItem(id)} />}
            right={items?.length > 0 ? toggle : null}
            open={open}
        >
            <form className="new_item_form">
                {returnItems}
                {items?.length > 0 && submit}
            </form>
        </BarLayout>
    );
};
