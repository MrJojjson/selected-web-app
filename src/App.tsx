import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@reach/router';
import React from 'react';
import { Provider } from 'react-redux';
import './common/sass/globals.style.scss';
import { AlertBase, ModalBase } from './components/molecules';
import { Navbar, Palette } from './components/organisms';
import { store } from './redux/store';
import appRoutes from './routes';

config.autoAddCss = false;

library.add(fas);
export const App = () => {
    return (
        <Provider store={store}>
            <Palette />
            <div className="content">
                <Navbar />
                <Router className="router">{...appRoutes}</Router>
            </div>
            <AlertBase />
            <ModalBase />
        </Provider>
    );
};
