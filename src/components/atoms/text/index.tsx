import cn from 'classnames';
import React, { forwardRef } from 'react';
import styles from '../../../../styles/atoms/text.module.scss';
import { directionType, fontSizeStyle, fontSizeType, textTag, themeType } from '../../../types';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type TextType = {
    children: string;
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
        const faIcon = icon && <FontAwesomeIcon className={styles.icon} icon={['fas', icon]} />;

        const text = React.createElement(
            tag,
            {
                className: cn(styles.text, styles[tag], styles[theme], styles[fontSize], className, {
                    [styles.line]: oneLine === true,
                    [styles.underline]: hyper,
                    [styles[style]]: style,
                    [styles[direction]]: !!icon && !!children,
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
