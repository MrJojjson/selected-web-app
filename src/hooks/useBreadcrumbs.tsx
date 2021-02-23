import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/hooks/useBreadcrumbs.module.scss';
import { LinkList, LinkType } from '../components/atoms';
import { convertStringToFriendlyFormat } from './useUrl';

type BreadcrumbType = Pick<LinkType, 'pathname' | 'title'>;

const convertBreadcrumb = (str: string) =>
    str &&
    (str
        .replace(/-/g, ' ')
        .replace(/oe/g, 'ö')
        .replace(/ae/g, 'ä')
        .replace(/ue/g, 'ü')
        .toUpperCase() as LinkType['pathname']);

export const useBreadcrumbs = () => {
    const { asPath } = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);
    useEffect(() => {
        if (asPath) {
            const linkPath = asPath.split('/');
            linkPath.shift();

            const pathArray = linkPath.map((title, i) => {
                const pathname = convertBreadcrumb('/' + linkPath.slice(0, i + 1).join('/'));
                const friendlyTitle = convertStringToFriendlyFormat({ path: title });
                return { title: friendlyTitle, pathname };
            });

            setBreadcrumbs(pathArray);
        }
    }, [asPath]);

    if (asPath !== '/') {
        breadcrumbs.unshift({ pathname: '/', title: 'home' });
    }

    return (
        <nav
            aria-label="breadcrumbs"
            className={cn(styles.breadcrumb, {
                [styles.active]: breadcrumbs && asPath !== '/',
            })}
        >
            <LinkList className={styles.breadcrumbs} links={breadcrumbs} />
        </nav>
    );
};
