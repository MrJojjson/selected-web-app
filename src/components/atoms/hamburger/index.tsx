import React from 'react';
import './hamburger.style.scss';
import cn from 'classnames';

export type HamburgerType = {
    onClick: () => void;
    open: boolean;
    className?: string;
};

export const Hamburger = ({ onClick, open, className }: HamburgerType) => {
    return (
        <div className={cn('entire_menu', className)}>
            <input
                type="checkbox"
                onChange={() => {}}
                checked={open}
                id="change_hamburguer"
                className="change_hamburguer"
            />
            <button className="hamburguer" onClick={() => onClick()}>
                <span></span>
                <label htmlFor="change_hamburguer"></label>
            </button>
        </div>
    );
};
