import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React from 'react';
import './selectors.style.scss';

type SelectorType = {
    onChange: () => void;
    checked?: boolean;
    className?: string;
    label?: string;
    color?: string;
    disabled?: boolean;
};

export const Selector = ({ checked = false, onChange, label, className, color, disabled }: SelectorType) => {
    return (
        <span style={{ color: color }} className={cn('selector', className, { disabled })} onClick={onChange}>
            <input
                onChange={onChange}
                onKeyPress={({ key }) => key === 'Enter' && onChange()}
                type="checkbox"
                checked={checked}
                disabled={disabled}
            />
            <span>
                <FontAwesomeIcon icon={['fas', 'check']} />
            </span>
            {label && <label>{label}</label>}
        </span>
    );
};
