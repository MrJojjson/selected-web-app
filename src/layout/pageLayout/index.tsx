import { map } from 'ramda';
import React from 'react';
import { SystemLayoutPageState } from '../../redux/types/systemTypes';
import { CompLayout } from '../compLayout';
import './pageLayout.scss';

type PageLayoutType = {
    children: JSX.Element | JSX.Element[];
    disableLayout?: boolean;
    columns?: SystemLayoutPageState['columns'];
};

type LayoutType = {
    child: JSX.Element;
};

const layout = ({ child }: LayoutType) => <CompLayout key={child?.key}>{child}</CompLayout>;

export const PageLayout = ({ children, disableLayout = false, columns }: PageLayoutType) => {
    let renderChildren = Array.isArray(children)
        ? map((child) => layout({ child }), children)
        : layout({ child: children });
    if (disableLayout) {
        renderChildren = children;
    }

    return <div className={`page_layout columns-${columns}`}>{renderChildren}</div>;
};
