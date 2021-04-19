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
        title: 'Spirits',
        pathname: '/spirits',
        icon: 'flask',
    },
    {
        title: 'Projects',
        pathname: '/projects',
        icon: 'project-diagram',
    },
    {
        title: 'Events',
        pathname: '/events',
        icon: 'calendar-alt',
    },
];

type PaletteLinksType = {
    onClick: () => void;
};

const PaletteLinks = ({ onClick }: PaletteLinksType) => {
    return (
        <div className="top">
            <LinkList links={links} onClick={onClick} />
        </div>
    );
};

export default PaletteLinks;
