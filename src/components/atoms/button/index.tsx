import cn from 'classnames';
import React from 'react';
import { Text, TextType } from '../text';
import './button.style.scss';

export type ButtonType = Pick<TextType, 'icon' | 'direction' | 'theme' | 'className'> & {
    onClick: () => void;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
    label?: string;
    type?: 'submit' | 'reset';
    id?: string;
    mini?: boolean;
    disabled?: boolean;
};

export const Button = ({
    onClick,
    onMouseOver,
    onMouseLeave,
    label,
    theme = 'primary',
    className,
    mini,
    icon,
    direction = 'row',
    disabled,
    ...rest
}: ButtonType) => {
    return (
        <button
            onClick={() => onClick()}
            onMouseOver={() => onMouseOver && onMouseOver()}
            onMouseLeave={() => onMouseLeave && onMouseLeave()}
            className={cn('button', [theme], className, {
                mini: mini,
                disabled,
            })}
            {...rest}
        >
            <Text tag="span" direction={direction} oneLine icon={icon} className={'text'}>
                {label}
            </Text>
        </button>
    );
};
