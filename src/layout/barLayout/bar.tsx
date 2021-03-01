import React from 'react';
import { BarLayoutType } from './';
import './barLayout.style.scss';

type BarType = Pick<BarLayoutType, 'left' | 'right'>;

export const Bar = ({ left, right }: BarType) => {
    return (
        <div className="bar">
            <div className="left">{left}</div>
            <div className="right">{right}</div>
        </div>
    );
};
