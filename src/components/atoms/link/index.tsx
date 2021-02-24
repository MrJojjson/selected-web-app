import NextLink, { LinkProps } from 'next/link';
import { map } from 'ramda';
import React from 'react';
import styles from '../../../../styles/atoms/link.module.scss';
import { toTypes } from '../../../types/linkTypes';
import { Text, TextType } from '../text';
import cn from 'classnames';

export type LinkType = Omit<LinkProps, 'href'> &
    Omit<TextType, 'children'> & {
        pathname: toTypes;
        hash?: string;
        query?: string;
        title?: string;
        href?: string;
        onClick?: () => void;
    };

export const Link = ({ pathname, hash, query, title, as, ...rest }: LinkType) => {
    return (
        <NextLink href={{ pathname, hash, query }} passHref>
            <Text className={styles.link} tag="a" oneLine={true} {...rest}>
                {title}
            </Text>
        </NextLink>
    );
};

export const FakeLink = ({ title, onClick }: Pick<LinkType, 'title' | 'onClick'>) => {
    return (
        <button className={styles.fake_link} onClick={() => onClick && onClick()}>
            <Text className={styles.link} tag="p" oneLine={true}>
                {title}
            </Text>
        </button>
    );
};

export type ListType = {
    links: LinkType[];
    className?: string;
};

export const LinkList = ({ links = [], className }: ListType) => {
    const linkList = map(
        (props) => (
            <li key={props.pathname}>
                <Link {...props} />
            </li>
        ),
        links,
    );
    return <ul className={cn(styles.link_list, className)}>{linkList}</ul>;
};
