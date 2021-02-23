import React from 'react';
import styles from '../../../../styles/organisms/navbar.module.scss';
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs';

export const NavbarMiddlePanel = () => {
    const breadcrumbs = useBreadcrumbs();

    return <div className={styles.settings}>{breadcrumbs}</div>;
};
