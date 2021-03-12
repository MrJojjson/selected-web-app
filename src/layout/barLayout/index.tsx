import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/atoms';
import { BarElement, BarElementType, BarHeadingType } from './bar';
import './barLayout.style.scss';

export type BarLayoutType = Omit<BarElementType, 'end'> &
    BarHeadingType & {
        children?: JSX.Element | JSX.Element[];
        overrideOpen?: boolean;
    };

export const BarLayout = ({ children, overrideOpen, start }: BarLayoutType) => {
    const [open, setOpen] = useState<boolean>(overrideOpen);
    const barContentRef = useRef<any | null>(null);

    useEffect(() => setOpen(overrideOpen), [overrideOpen]);

    const barBtn = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    return (
        <div
            className={cn('bar_layout', {
                open,
            })}
        >
            <BarElement end={barBtn} start={start} />
            <ul ref={barContentRef} className="bar_content">
                {children}
            </ul>
        </div>
    );
};
