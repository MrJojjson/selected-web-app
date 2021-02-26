import { map } from 'ramda';
import React from 'react';
import { CompLayout } from '../compLayout';
import './pageLayout.style.scss';

type PageLayoutType = {
    children: JSX.Element | JSX.Element[];
};

const layout = (child: JSX.Element) => <CompLayout key={child.key}>{child}</CompLayout>;

export const PageLayout = ({ children }: PageLayoutType) => {
    const renderChildren = Array.isArray(children) ? map((child) => layout(child), children) : layout(children);

    return <div className="page_layout">{renderChildren}</div>;
};
