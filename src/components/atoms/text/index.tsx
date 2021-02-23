import cn from 'classnames';
import React, { forwardRef } from 'react';
import styles from '../../../../styles/atoms/text.module.scss';
import { fontSizeType, textTag, themeType } from '../../../types';

export type TextType = {
    children: string;
    tag?: textTag;
    theme?: themeType;
    fontSize?: fontSizeType;
    oneLine?: boolean;
    className?: string;
    href?: string;
    hyper?: boolean;
};

export const Text = forwardRef(
    ({ children, tag = 'p', theme = 'primary', fontSize = 'm', oneLine, className, href, hyper }: TextType, ref) => {
        const text = React.createElement(
            tag,
            {
                className: cn(styles.text, styles[tag], styles[theme], styles[fontSize], className, {
                    [styles.line]: oneLine === true,
                    [styles.underline]: hyper,
                }),
                ref,
                href,
            },
            children,
        );
        return text;
    },
);
