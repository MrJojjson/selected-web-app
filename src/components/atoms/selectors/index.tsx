import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './selectors.style.scss';

type SelectorType = {
    onChange: () => void;
    checked?: boolean;
    className?: string;
};

export const Selector = ({ checked = false, onChange, className }: SelectorType) => {
    return (
        <span className={className} onClick={onChange}>
            <input
                onChange={onChange}
                onKeyPress={({ key }) => key === 'Enter' && onChange()}
                type="checkbox"
                checked={checked}
            />
            <span>
                <FontAwesomeIcon icon={['fas', 'check']} />
            </span>
        </span>
    );
};
