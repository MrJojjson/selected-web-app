import React from 'react';
import styles from '../../../../styles/organisms/palette.module.scss';
import { LinkList, LinkType } from '../../atoms';

const links: LinkType[] = [
    {
        title: 'Dashboard',
        pathname: '/dashboard',
        icon: 'tachometer-alt',
    },
    {
        title: 'Graph',
        pathname: '/graphs',
        icon: 'chart-bar',
    },
];

export const PaletteTopPanel = () => {
    return (
        <div className={styles.top}>
            <LinkList links={links} />
        </div>
    );
};
