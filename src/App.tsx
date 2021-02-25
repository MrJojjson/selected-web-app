import { RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import './common/sass/globals.style.scss';

import { Navbar, Palette } from './components/organisms';
import { Dashboard } from './pages/dashboard';
import { Graph } from './pages/graph';
import { Home } from './pages/home';
import { Settings } from './pages/settings';

const Route = (props: { component: JSX.Element } & RouteComponentProps) => props.component;

export const App = (): JSX.Element => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Palette />
                <Router className="router">
                    <Route path="/" component={<Home />} />
                    <Route path="/dashboard" component={<Dashboard />} />
                    <Route path="/graph" component={<Graph />} />
                    <Route path="/settings" component={<Settings />} />
                </Router>
            </div>
        </>
    );
};
