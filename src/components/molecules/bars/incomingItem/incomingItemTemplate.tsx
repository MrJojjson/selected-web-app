import { includes } from 'ramda';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { puchaseIncomingData, puchaseIncomingSelected } from '../../../../redux';
import { getPurchaseIncomingSelectedState } from '../../../../redux/selectors/purchaseSelector';
import { inputType } from '../../../../types/inputTypes';
import { Button, Header, Input, InputType } from '../../../atoms';
import { Selector } from '../../../atoms/selectors';
import { IncomingItemListId } from './incomingItemAdds';

type TemplateType = {
    id: IncomingItemListId;
    title: string;
    uid: string;
};

type GenerateInputType = Pick<InputType, 'label' | 'id' | 'onBlur'> & {
    type?: inputType;
};

const generateInput = ({ label, type = 'text', id, onBlur }: GenerateInputType) => (
    <li>
        <Input label={label} placeholder={label} name={id} type={type} onBlur={onBlur} />
    </li>
);

export const CaskAndLiquourTemplate = ({ id, uid, title }: TemplateType) => {
    const [data, setData] = useState([]);
    const selected = includes(uid, getPurchaseIncomingSelectedState());
    const dispatch = useDispatch();

    const onBlurInput = ({ currentTarget }: React.ChangeEvent<EventTarget & HTMLInputElement>) => {
        // setData([...data, { uid }]);
        const { value } = currentTarget;
        dispatch(puchaseIncomingData({ id: uid, data: { value } }));
    };

    const cask = (
        <>
            {generateInput({ label: 'Cask #', id: `${uid}-casknumber`, onBlur: (event) => onBlurInput(event) })}
            {generateInput({
                label: 'Volume in liters',
                id: `${uid}-caskvolume`,
                onBlur: (event) => onBlurInput(event),
            })}
            {generateInput({ label: 'Material', id: `${uid}-caskmaterial`, onBlur: (event) => onBlurInput(event) })}
            {generateInput({
                label: 'Prior liqour',
                id: `${uid}-caskpriorliqour`,
                onBlur: (event) => onBlurInput(event),
            })}
        </>
    );

    const liqour = (
        <>
            {generateInput({ label: 'Liqour #', id: `${uid}-liqournumber`, onBlur: (event) => onBlurInput(event) })}
            {generateInput({
                label: 'Volume in liters',
                id: `${uid}-liqourvolume`,
                onBlur: (event) => onBlurInput(event),
            })}
            {generateInput({
                label: 'Strength',
                id: `${uid}-liqourstrength`,
                type: 'number',
                onBlur: (event) => onBlurInput(event),
            })}
            {generateInput({
                label: 'PPM',
                id: `${uid}-liqourppm`,
                type: 'number',
                onBlur: (event) => onBlurInput(event),
            })}
        </>
    );

    return (
        <>
            <div className="bars_incoming_item_description">
                <Selector checked={selected} onChange={() => dispatch(puchaseIncomingSelected({ id: uid }))} />
                <Input
                    label={title}
                    placeholder={title}
                    defaultValue="The cask of all dreams"
                    name={`${uid}-name`}
                    type="text"
                    className="bars_incoming_item_title"
                />
            </div>
            <ul className="bars_incoming_item_list">
                {(id === 'cask' || id === 'caskandliquor') && cask}
                {(id === 'liqour' || id === 'caskandliquor') && liqour}
            </ul>
        </>
    );
};
