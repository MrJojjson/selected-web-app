import { includes, map } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { puchaseIncomingAddedData, puchaseIncomingSelected } from '../../../../redux';
import {
    getPurchaseIncomingAddedState,
    getPurchaseIncomingSelectedState,
} from '../../../../redux/selectors/purchaseSelector';
import { PurchaseIncomingAddedState } from '../../../../redux/types/purchaseTypes';
import { Input } from '../../../atoms';
import { Selector } from '../../../atoms/selectors';

type OnBlurInputType = {
    event: React.ChangeEvent<EventTarget & HTMLInputElement>;
    uid: string;
};

export const IncomingItemWhisky = () => {
    const added = getPurchaseIncomingAddedState();
    const selected = getPurchaseIncomingSelectedState();
    const dispatch = useDispatch();
    console.log('selected', selected);

    const onBlurInput = ({ event, uid }: OnBlurInputType) => {
        const { value, name } = event?.currentTarget;
        dispatch(puchaseIncomingAddedData({ id: name, uid, value }));
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
            <div key={id}>
                <div className="bars_incoming_item_description">
                    <Selector
                        checked={includes(id, selected)}
                        onChange={() => dispatch(puchaseIncomingSelected({ id }))}
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

    return <>{mapAdded}</>;
};
