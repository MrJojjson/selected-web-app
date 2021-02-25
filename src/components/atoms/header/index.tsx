import React from 'react';
import { fontSizeType, headerTag, themeType } from '../../../types';
import './header.style.scss';
import cn from 'classnames';

export type HeaderType = {
    children: string;
    tag?: headerTag;
    theme?: themeType;
    fontSize?: fontSizeType;
    oneLine?: boolean;
    className?: string;
};

export const Header = ({
    tag = 'h3',
    children,
    theme = 'primary',
    fontSize = 'm',
    oneLine,
    className,
    ...rest
}: HeaderType) => {
    return React.createElement(
        tag,
        {
            className: cn([tag], [theme], [fontSize], className, {
                line: oneLine,
            }),
            ...rest,
        },
        children,
    );
};
