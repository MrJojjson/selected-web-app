import { includes, map } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BarLayout } from '../../../layout/barLayout';
import { purchaseIncomingAddedData, purchaseIncomingSelected } from '../../../redux';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../redux/selectors/purchaseSelector';
import { PurchaseIncomingAddedState } from '../../../redux/types/purchaseTypes';
import { Button, Header, Input } from '../../atoms';
import { Selector } from '../../atoms/selectors';
import { BarsHeading } from './barsHeading';

type OnBlurInputType = {
    event: React.ChangeEvent<EventTarget & HTMLInputElement>;
    uid: string;
};

export const IncomingItemWhisky = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();
    const dispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => setOpen(added?.length > 0), [added]);

    const onBlurInput = ({ event, uid }: OnBlurInputType) => {
        const { value, name } = event?.currentTarget;
        dispatch(purchaseIncomingAddedData({ id: name, uid, value }));
    };
    const returnList = ({ data, id: uid }: PurchaseIncomingAddedState) => {
        return map(
            ({ id, title, type }) => (
                <li key={`${uid}-${id}`}>
                    <Input
                        label={title}
                        placeholder={title}
                        name={id}
                        type={type}
                        onBlur={(event) => onBlurInput({ event, uid })}
                    />
                </li>
            ),
            data,
        );
    };
    const mapAdded = map(({ data, id }) => {
        return (
            <div key={id} className="bars_incoming_item">
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
                <ul className="bars_incoming_item_list">{returnList({ data, id })}</ul>
            </div>
        );
    }, added);

    const toggle = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <BarLayout left={<BarsHeading title="New purchase" />} right={toggle} open={open}>
            <form
                className="incoming_item_form"
                noValidate
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            >
                {mapAdded}
            </form>
        </BarLayout>
    );
};
