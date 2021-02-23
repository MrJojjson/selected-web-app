import React from 'react';
import styles from '../../../../styles/atoms/hamburger.module.scss';
import cn from 'classnames';

type HamburgerType = {
    onClick: () => void;
    open: boolean;
    className?: string;
};

export const Hamburger = ({ onClick, open, className }: HamburgerType) => {
    return (
        <div className={cn(styles.entire_menu, className)}>
            <input
                type="checkbox"
                onChange={() => {}}
                checked={open}
                id="change_hamburguer"
                className={styles.change_hamburguer}
            />
            <button className={styles.hamburguer} onClick={() => onClick()}>
                <span></span>
                <label htmlFor="change_hamburguer"></label>
            </button>
        </div>
    );
};
