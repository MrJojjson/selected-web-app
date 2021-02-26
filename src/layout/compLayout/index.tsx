import React from 'react';
import './compLayout.style.scss';

type CompLayoutType = {
    children: JSX.Element | JSX.Element[];
};

export const CompLayout = ({ children }: CompLayoutType) => {
    return <div className="comp_layout">{children}</div>;
};
