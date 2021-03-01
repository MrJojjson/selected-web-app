import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Bar } from './bar';
import './barLayout.style.scss';

export type BarLayoutType = {
    left?: JSX.Element;
    right?: JSX.Element;
    children?: JSX.Element | JSX.Element[];
    open?: boolean;
};

export const BarLayout = ({ left, right, children, open }: BarLayoutType) => {
    const barContentRef = useRef<any | null>(null);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        if (!open) {
            setHeight(0);
        } else if (barContentRef && barContentRef.current) {
            const { height } = barContentRef.current?.firstChild?.getBoundingClientRect() || {};
            typeof height === 'number' && setHeight(height + 20);
        }
    }, [children]);

    return (
        <div
            className={cn('bar_layout', {
                open,
            })}
        >
            <Bar left={left} right={right} />
            <div ref={barContentRef} className="bar_content" style={{ height }}>
                {children}
            </div>
        </div>
    );
};
