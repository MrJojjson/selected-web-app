import { includes, map } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BarLayout } from '../../../layout/barLayout';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../redux/selectors/purchaseSelector';
import { PurchaseIncomingAddedState } from '../../../redux/types/purchaseTypes';
import { Button, Input } from '../../atoms';
import { Selector } from '../../atoms/selectors';
import { BarsHeading } from './barsHeading';
import { purchaseIncomingAddedData, purchaseIncomingSelected } from '../../../redux';
type OnBlurInputType = {
    event: React.ChangeEvent<EventTarget & HTMLInputElement>;
    uid: string;
};

export const IncomingItemWhisky = () => {
    const added = getPurchaseIncomingAddedState();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => setOpen(added?.length > 0), [added]);

    const toggle = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    return (
        <BarLayout left={<BarsHeading title="New purchase" />} right={toggle} open={open}>
            <ul className="incoming_item_form">
                <AddedItems />
            </ul>
        </BarLayout>
    );
};

const AddedItems = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();
    const dispatch = useDispatch();
    return (
        <>
            {map(({ data, id }) => {
                return (
                    <li key={id} className="bars_incoming_item">
                        <div className="bars_incoming_item_description">
                            <Selector
                                checked={includes(id, selected)}
                                onChange={() => dispatch(purchaseIncomingSelected({ id }))}
                            />
                            <Input
                                label={'Name'}
                                placeholder={'Name'}
                                defaultValue="The cask of all dreams"
                                name="name"
                                type="text"
                                className="bars_incoming_item_title"
                            />
                        </div>
                        <ul className="bars_incoming_item_list">{<AddedItemList data={data} id={id} />}</ul>
                    </li>
                );
            }, added)}
        </>
    );
};

const AddedItemList = ({ data, id: uid }: PurchaseIncomingAddedState) => {
    const dispatch = useDispatch();
    const onBlurInput = ({ event, uid }: OnBlurInputType) => {
        const { value, name } = event?.currentTarget;

        dispatch(purchaseIncomingAddedData({ id: name, uid, value }));
    };
    return (
        <>
            {map(
                ({ id, title, type, value }) => (
                    <li key={`${uid}-${id}`}>
                        <Input
                            label={title}
                            placeholder={title}
                            defaultValue={value}
                            name={id}
                            type={type}
                            onBlur={(event) => onBlurInput({ event, uid })}
                        />
                    </li>
                ),
                data,
            )}
        </>
    );
};
