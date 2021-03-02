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
        pathname: '/purchases',
        icon: 'money-bill',
    },
    {
        title: 'Casks',
        pathname: '/casks',
        icon: 'pallet',
    },
    {
        title: 'Whisky',
        pathname: '/whisky',
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
