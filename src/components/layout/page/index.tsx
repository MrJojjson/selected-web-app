import React from 'react';
import styles from '../../../../styles/layout/page.module.scss';
import { PageTypes } from '../../../types/PageTypes';

export const Page = ({ children }: PageTypes) => {
    return <div className={styles.page}>{children}</div>;
};
