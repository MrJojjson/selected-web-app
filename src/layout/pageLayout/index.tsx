import { map } from 'ramda';
import React from 'react';
import { CompLayout } from '../compLayout';
import './pageLayout.style.scss';

type PageLayoutType = {
    children: JSX.Element | JSX.Element[];
    disableLayout?: boolean;
};

const layout = (child: JSX.Element) => <CompLayout key={child?.key}>{child}</CompLayout>;

export const PageLayout = ({ children, disableLayout = false }: PageLayoutType) => {
    let renderChildren = Array.isArray(children) ? map((child) => layout(child), children) : layout(children);
    if (disableLayout) {
        renderChildren = children;
    }
    return <div className="page_layout">{renderChildren}</div>;
};
