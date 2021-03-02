import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import './common/sass/globals.style.scss';
import { Navbar, Palette } from './components/organisms';
import appRoutes from './routes';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AlertBase, ModalBase } from './components/molecules';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
