import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import './common/sass/globals.style.scss';
import { Navbar, Palette } from './components/organisms';
import appRoutes from './routes';

export const App = () => {
    return (
        <>
            <Palette />

            <div className="content">
                <Navbar />

                <Router className="router">{...appRoutes}</Router>
            </div>
        </>
    );
};
