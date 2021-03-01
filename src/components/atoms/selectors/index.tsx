import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './selectors.style.scss';

type SelectorType = {
    onChange: () => void;
    checked?: boolean;
};

export const Selector = ({ checked = false, onChange }: SelectorType) => {
    return (
        <span onClick={onChange}>
            <input onChange={onChange} type="checkbox" checked={checked} />
            <span>
                <FontAwesomeIcon icon={['fas', 'check']} />
            </span>
        </span>
    );
};
