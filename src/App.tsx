import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './common/sass/globals.style.scss';
import { LoadingIndicator, Text } from './components/atoms';
import { AlertBase, ModalBase } from './components/molecules';
import { Auth } from './components/molecules/auth';
import Navbar from './components/organisms/navbar';
import Palette from './components/organisms/palette';
import { useAuth } from './hooks/useAuth';
import { PageLayout } from './layout/pageLayout';
import appRoutes from './routes';

config.autoAddCss = false;

library.add(fas);

export const App = () => {
    const { loading, loggedIn } = useAuth();
    if (loading) {
        return <LoadingIndicator />;
    } else if (loggedIn) {
        return (
            <Router>
                <Palette />
                <div className="content">
                    <Navbar />
                    {...appRoutes}
                </div>
                <AlertBase />
                <ModalBase />
            </Router>
        );
    }
    return (
        <PageLayout>
            <Auth key="auth" />
        </PageLayout>
    );
};
