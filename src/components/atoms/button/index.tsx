import React from 'react';
import { buttonType, themeType } from '../../../types';
import cn from 'classnames';

import styles from '../../../../styles/atoms/button.module.scss';

type ButtonType = {
    onClick: () => void;
    label: string;
    type?: buttonType;
    theme?: themeType;
    className?: string;
    id?: string;
    mini?: boolean;
};

export const Button = ({ onClick, label, theme = 'primary', className, mini, ...rest }: ButtonType) => {
    return (
        <button
            onClick={() => onClick()}
            className={cn(styles.button, styles[theme], className, {
                [styles.mini]: mini,
            })}
            {...rest}
        >
            {label}
        </button>
    );
};
