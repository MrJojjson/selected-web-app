import { includes, map } from 'ramda';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uniqueId } from '../../../../common/utils/uniqueId';
import { puchaseIncomingData, puchaseIncomingSelected } from '../../../../redux';
import { getPurchaseIncomingSelectedState } from '../../../../redux/selectors/purchaseSelector';
import { WhiskyVars } from '../../../../types/whiskyTypes';
import { Input } from '../../../atoms';
import { Selector } from '../../../atoms/selectors';

type TemplateType = {
    uid: string;
};

export const IncomingItemWhisky = ({ uid }: TemplateType) => {
    const [data, setData] = useState([]);
    const selected = includes(uid, getPurchaseIncomingSelectedState());
    const dispatch = useDispatch();

    const onBlurInput = ({ currentTarget }: React.ChangeEvent<EventTarget & HTMLInputElement>) => {
        const { value, name } = currentTarget;
        dispatch(puchaseIncomingData({ id: uid, data: { value, name } }));
    };

    const returnInputs = map(
        ({ id, title, type }) => (
            <li key={`${uid}-${id}`}>
                <Input label={title} placeholder={title} name={id} type={type} onBlur={onBlurInput} />
            </li>
        ),
        WhiskyVars,
    );

    return (
        <>
            <div className="bars_incoming_item_description">
                <Selector checked={selected} onChange={() => dispatch(puchaseIncomingSelected({ id: uid }))} />
                <Input
                    label={'Name'}
                    placeholder={'Name'}
                    defaultValue="The cask of all dreams"
                    name="name"
                    type="text"
                    className="bars_incoming_item_title"
                />
            </div>
            <ul className="bars_incoming_item_list">{returnInputs}</ul>
        </>
    );
};
