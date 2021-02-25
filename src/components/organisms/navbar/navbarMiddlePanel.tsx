import React from 'react';
import { useDispatch } from 'react-redux';
import { alertToggleOpen, getAlertOpenState, getModalOpenState, modalToggleOpen } from '../../../redux';
import { Button } from '../../atoms';
import './navbar.style.scss';

export const NavbarMiddlePanel = () => {
    const dispatch = useDispatch();
    const modalOpen = getModalOpenState();
    const alertOpen = getAlertOpenState();
    return (
        <div className="settings">
            <Button
                mini
                theme="secondary"
                direction="row-reverse"
                label="Modal"
                icon={modalOpen ? 'window-minimize' : 'window-maximize'}
                onClick={() => dispatch(modalToggleOpen({ contentType: 'menu' }))}
            />
            <Button
                mini
                theme="highlight"
                direction="row-reverse"
                label="Alert"
                icon={alertOpen ? 'window-minimize' : 'window-maximize'}
                onClick={() => dispatch(alertToggleOpen({}))}
            />
        </div>
    );
};
