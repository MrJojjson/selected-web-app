import React from 'react';
import './compLayout.style.scss';
import cn from 'classnames';

type CompLayoutType = {
    children: JSX.Element | JSX.Element[];
    className?: string;
};

export const CompLayout = ({ children, className }: CompLayoutType) => {
    return <div className={cn('comp_layout', className)}>{children}</div>;
};
