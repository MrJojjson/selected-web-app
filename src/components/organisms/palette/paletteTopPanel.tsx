import React from 'react';
import { LinkList, LinkType } from '../../atoms';
import './palette.style.scss';

const links: LinkType[] = [
    {
        title: 'Dasboard',
        pathname: '/dashboard',
        icon: 'columns',
    },
    {
        title: 'Purchases',
        pathname: '/puchases',
        icon: 'money-bill',
    },
    {
        title: 'Casks',
        pathname: '/casks',
        icon: 'pallet',
    },
    {
        title: 'Liquor',
        pathname: '/liqour',
        icon: 'flask',
    },
];

export const PaletteTopPanel = () => {
    return (
        <div className="top">
            <LinkList links={links} />
        </div>
    );
};
