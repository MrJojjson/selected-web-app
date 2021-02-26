import { Link as ReachLink } from '@reach/router';
import { map } from 'ramda';
import React from 'react';
import './link.style.scss';
import { toTypes } from '../../../types/linkTypes';
import { Text, TextType } from '../text';
import cn from 'classnames';

export type LinkType = Omit<TextType, 'children'> & {
    pathname: toTypes;
    hash?: string;
    query?: string;
    title?: string;
    href?: string;
    onClick?: () => void;
};

const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: `active` } : {};
};

export const Link = ({ pathname, hash, query, title, className, ...rest }: LinkType) => {
    let to = pathname;
    if (query) {
        pathname += `?${query}`;
    } else if (hash) {
        pathname += `#${hash}`;
    }
    return (
        <ReachLink to={to} getProps={isActive}>
            <Text className="link" theme="secondary" tag="span" oneLine={true} {...rest}>
                {title}
            </Text>
        </ReachLink>
    );
};

export const FakeLink = ({ title, onClick }: Pick<LinkType, 'title' | 'onClick'>) => {
    return (
        <button className="fake_link" onClick={() => onClick && onClick()}>
            <Text className="link" tag="p" oneLine={true}>
                {title}
            </Text>
        </button>
    );
};

export type ListType = {
    links: LinkType[];
    className?: string;
    mini?: boolean;
};

export const LinkList = ({ links = [], className, mini }: ListType) => {
    const linkList = map(
        (props) => (
            <li key={props.pathname}>
                <Link direction="column" {...props} />
            </li>
        ),
        links,
    );
    return (
        <ul
            className={cn('link_list', className, {
                mini: mini,
            })}
        >
            {linkList}
        </ul>
    );
};
