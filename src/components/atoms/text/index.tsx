import cn from 'classnames';
import React, { forwardRef } from 'react';
import './text.style.scss';
import { directionType, fontSizeStyle, fontSizeType, textTag, themeType } from '../../../types/commonTypes';

import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type TextType = {
    children: string | number;
    tag?: textTag;
    theme?: themeType;
    fontSize?: fontSizeType;
    oneLine?: boolean;
    className?: string;
    href?: string;
    hyper?: boolean;
    style?: fontSizeStyle;
    icon?: IconName;
    direction?: directionType;
    onClick?: () => void;
};

export const Text = forwardRef(
    (
        {
            children,
            tag = 'p',
            theme = 'primary',
            fontSize = 'm',
            oneLine,
            className,
            href,
            hyper,
            style,
            icon,
            direction = 'row',
            onClick,
        }: TextType,
        ref,
    ) => {
        const faIcon = icon && <FontAwesomeIcon className={'icon'} icon={['fas', icon]} />;

        const text = React.createElement(
            tag,
            {
                className: cn('text', [tag], [theme], [fontSize], className, {
                    line: oneLine === true,
                    underline: hyper,
                    [style]: style,
                    [direction]: !!icon && !!children,
                }),
                ref,
                href,
                onClick,
            },
            faIcon,
            children,
        );
        return text;
    },
);
