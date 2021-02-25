import React from 'react';
import { Text } from '../../atoms';
import './navbar.style.scss';
import { NavbarMiddlePanel } from './navbarMiddlePanel';

export const Navbar = () => {
    return (
        <header className="header">
            <div className="system">
                <Text theme="secondary">System quick access?</Text>
            </div>

            <NavbarMiddlePanel />
            <div className="auth">
                <Text theme="secondary">Auth?</Text>
            </div>
        </header>
    );
};
