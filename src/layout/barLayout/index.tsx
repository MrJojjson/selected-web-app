import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { uniqueId } from '../../common/utils/uniqueId';
import { Button } from '../../components/atoms';
import { BarElement, BarHeadingType, BarElementType } from './bar';
import './barLayout.style.scss';

export type BarLayoutType = Omit<BarElementType, 'end'> &
    BarHeadingType & {
        children?: JSX.Element | JSX.Element[];
        overrideOpen?: boolean;
    };

export const BarLayout = ({ children, overrideOpen, start }: BarLayoutType) => {
    const [open, setOpen] = useState<boolean>(overrideOpen);
    // const [height, setHeight] = useState<number>(0);

    const barContentRef = useRef<any | null>(null);

    useEffect(() => setOpen(overrideOpen), [overrideOpen]);

    // useEffect(() => {
    //     if (!open) {
    //         setHeight(0);
    //     } else if (barContentRef && barContentRef.current) {
    //             const { height } = barContentRef.current?.firstChild?.getBoundingClientRect() || {};
    //             typeof height === 'number' && setHeight(height + 20);
    //     }
    // }, [children, open]);

    const barBtn = <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />;

    return (
        <div
            className={cn('bar_layout', {
                open,
            })}
        >
            <BarElement end={barBtn} start={start} />
            <div ref={barContentRef} className="bar_content">
                {children}
            </div>
        </div>
    );
};
