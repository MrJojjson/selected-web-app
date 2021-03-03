import cn from 'classnames';
import React from 'react';
import { BarLayoutType } from './';
import './barLayout.style.scss';

type BarType = Pick<BarLayoutType, 'left' | 'right'> & {
    className?: string;
};

export const Bar = ({ left, right, className }: BarType) => {
    return (
        <div className={cn('bar', className)}>
            <div className="left">{left}</div>
            <div className="right">{right}</div>
        </div>
    );
};
