import cn from 'classnames';
import React from 'react';
import { Selector } from '../selectors';
import { Text } from '../text';
import './chip.style.scss';

type ChipType = {
    label: string;
    onClick: () => void;
    active?: boolean;
    className?: string;
};

export const Chip = ({ label, active = false, onClick, className }: ChipType) => {
    return (
        <button
            className={cn('chip', className, {
                active: active,
            })}
            onClick={onClick}
        >
            <Text tag="span" className="chip_label">
                {label}
            </Text>
        </button>
    );
};
