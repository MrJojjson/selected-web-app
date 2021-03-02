import { filter, includes, keysIn, map, reject } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uniqueId } from '../../../../common/utils/uniqueId';
import { BarLayout } from '../../../../layout/barLayout';
import { Bar } from '../../../../layout/barLayout/bar';
import { puchaseIncomingSelected } from '../../../../redux';
import { getPurchaseIncomingSelectedState } from '../../../../redux/selectors/purchaseSelector';
import { Button } from '../../../atoms';
import { BarsHeadingType } from '../barsHeading';
import { IncomingItemAdds, IncomingItemListId } from './incomingItemAdds';
import { IncomingItemSettings } from './incomingItemSettings';
import { IncomingItemWhisky } from './incomingItemWhisky';
type IncomingItemType = BarsHeadingType;

type IncomingAddedItemType = JSX.Element;

export const IncomingItem = ({ ...rest }: IncomingItemType) => {
    const dispatch = useDispatch();
    const selectedItems = getPurchaseIncomingSelectedState();

    const [items, setItems] = useState<IncomingAddedItemType[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const itemsExists = items?.length > 0;

    useEffect(() => setOpen(itemsExists), [items]);

    const removeSelected = () => {
        const result = reject(({ key }) => includes(key, selectedItems), items);
        dispatch(puchaseIncomingSelected({ clear: true }));
        setItems(result);
    };

    const toggle = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    const addIncomingItem = () => {
        const uid = uniqueId('whisky');
        setItems([...items, <IncomingItemWhisky key={uid} uid={uid} />]);
    };

    const returnItems = map(
        (item) => (
            <ul key={item.key} className="bars_incoming_item">
                <li className="bars_incoming_item_content">{item}</li>
            </ul>
        ),
        items,
    );

    const clear = (
        <Button
            label="Clear"
            theme="secondary"
            icon="minus-square"
            onClick={() => dispatch(puchaseIncomingSelected({ clear: true }))}
        />
    );

    const remove = <Button label="Remove" theme="secondary" icon="trash" onClick={() => removeSelected()} />;
    const stash = <Button label="Archive" theme="secondary" icon="archive" onClick={() => removeSelected()} />;
    const submit = <Button label="Save purchase" type="submit" theme="highlight" icon="save" onClick={() => {}} />;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <BarLayout
            left={<IncomingItemAdds onClick={(id: IncomingItemListId) => addIncomingItem()} />}
            right={toggle}
            open={open}
        >
            <div>
                {itemsExists && <IncomingItemSettings />}
                <form
                    className="incoming_item_form"
                    noValidate
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                >
                    {returnItems}
                    <Bar
                        left={
                            selectedItems?.length > 0 && (
                                <>
                                    {clear}
                                    {remove}
                                    {stash}
                                </>
                            )
                        }
                        right={itemsExists && submit}
                    />
                </form>
            </div>
        </BarLayout>
    );
};
