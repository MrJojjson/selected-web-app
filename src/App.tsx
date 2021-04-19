import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './common/sass/globals.style.scss';
import { AlertBase } from './components/molecules';
import ModalBase from './components/molecules/modal';
import Navbar from './components/organisms/navbar';
import Palette from './components/organisms/palette';
import { AuthProvider } from './providers/AuthProvider';
import appRoutes from './routes';

config.autoAddCss = false;

library.add(fas);

export const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Palette />
                <div className="content">
                    <Navbar />
                    {appRoutes}
                </div>
                <ModalBase />
                <AlertBase />
            </AuthProvider>
        </Router>
    );
};
