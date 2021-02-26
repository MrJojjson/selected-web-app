import React from 'react';
import { LinkList, LinkType } from '../../atoms';
import './palette.style.scss';

const links: LinkType[] = [
    {
        title: 'Profile',
        pathname: '/profile',
        icon: 'user',
    },
    {
        title: 'Settings',
        pathname: '/settings',
        icon: 'cog',
    },
];

export const PaletteBottomPanel = () => {
    return (
        <div className="bottom">
            <LinkList links={links} mini />
        </div>
    );
};
