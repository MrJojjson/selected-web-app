import React from 'react';
import './palette.style.scss';
import { LinkList, LinkType } from '../../atoms';

const links: LinkType[] = [
    {
        title: 'Dashboard',
        pathname: '/dashboard',
        icon: 'tachometer-alt',
    },
    {
        title: 'Graph',
        pathname: '/graph',
        icon: 'chart-bar',
    },
];

export const PaletteTopPanel = () => {
    return (
        <div className="top">
            <LinkList links={links} />
        </div>
    );
};
