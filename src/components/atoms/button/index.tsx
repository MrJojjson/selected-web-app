import React from 'react';
import { buttonType, directionType, themeType } from '../../../types';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/free-solid-svg-icons';

import styles from '../../../../styles/atoms/button.module.scss';
import { Text, TextType } from '../text';

type ButtonType = Pick<TextType, 'icon' | 'direction' | 'theme' | 'className'> & {
    onClick: () => void;
    label?: string;
    type?: buttonType;
    id?: string;
    mini?: boolean;
};

export const Button = ({
    onClick,
    label,
    theme = 'primary',
    className,
    mini,
    icon,
    direction = 'row',
    ...rest
}: ButtonType) => {
    return (
        <button
            onClick={() => onClick()}
            className={cn(styles.button, styles[theme], className, {
                [styles.mini]: mini,
            })}
            {...rest}
        >
            {/* {icon && <FontAwesomeIcon className={styles.icon} icon={['fas', icon]} />} */}
            <Text tag="span" oneLine icon={icon} fontSize="s" className={styles.text}>
                {label}
            </Text>
        </button>
    );
};
