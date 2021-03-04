import React from 'react';
import { LinkList, LinkType } from '../../atoms';
import './palette.style.scss';

const links: LinkType[] = [
    {
        title: 'Dasboard',
        pathname: '/',
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
        title: 'Whiskies',
        pathname: '/whiskies',
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
