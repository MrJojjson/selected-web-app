import React from 'react';
import { fontSizeType, headerTag, themeType } from '../../../types';
import styles from '../../../../styles/atoms/header.module.scss';
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
            className: cn(styles[tag], styles[theme], styles[fontSize], className, {
                [styles.line]: oneLine === true,
            }),
            ...rest,
        },
        children,
    );
};
