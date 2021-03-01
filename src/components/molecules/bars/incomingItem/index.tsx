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
type IncomingItemType = BarsHeadingType;

type IncomingAddedItemType = JSX.Element;

const getInputsFromForm = (e: React.FormEvent<HTMLFormElement>) => {
    const inputs = e?.currentTarget?.getElementsByTagName('input');
    let correctInputs = [];
    let index = 0;
    for (let i = 0; i < inputs.length; i++) {
        const { id, value } = inputs[i];
        const correctId = includes('cask' || 'liqour', id);
        if (correctId) {
            const { id: priorId, ...rest } = inputs[i - 1];
            console.log('priorId', priorId);
            console.log('rest', rest);

            if (priorId !== id) {
                index += 1;
            }
            correctInputs[index] = { value };
        }
    }

    console.log('correctInputs', correctInputs);
};

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

    const addIncomingItem = async (id: IncomingItemListId) => {
        const uid = uniqueId(id);
        let title = 'New cask and liquor';
        if (id === 'cask') {
            title = 'New cask';
        }
        if (id === 'liqour') {
            title = 'New liqour';
        }
        const { CaskAndLiquourTemplate } = await import('./incomingItemTemplate');

        const item: IncomingAddedItemType = <CaskAndLiquourTemplate key={uid} uid={uid} id={id} title={title} />;

        setItems([...items, item]);
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
        getInputsFromForm(e);
    };

    return (
        <BarLayout
            left={<IncomingItemAdds onClick={(id: IncomingItemListId) => addIncomingItem(id)} />}
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
