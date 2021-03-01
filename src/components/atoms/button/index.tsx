import cn from 'classnames';
import React from 'react';
import { Text, TextType } from '../text';
import './button.style.scss';

export type ButtonType = Pick<TextType, 'icon' | 'direction' | 'theme' | 'className'> & {
    onClick: () => void;
    label?: string;
    type?: 'submit' | 'reset';
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
            className={cn('button', [theme], className, {
                mini: mini,
            })}
            {...rest}
        >
            <Text tag="span" direction={direction} oneLine icon={icon} className={'text'}>
                {label}
            </Text>
        </button>
    );
};
