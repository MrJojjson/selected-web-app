import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@reach/router';
import React from 'react';
import './common/sass/globals.style.scss';
import { Text } from './components/atoms';
import { AlertBase, ModalBase } from './components/molecules';
import { Auth } from './components/molecules/auth';
import { Navbar, Palette } from './components/organisms';
import { useAuth } from './hooks/useAuth';
import { PageLayout } from './layout/pageLayout';
import appRoutes from './routes';
config.autoAddCss = false;

library.add(fas);

export const App = () => {
    const { loading, loggedIn } = useAuth();

    // if (loading) {
    //     return <Text>LOADING!!!</Text>;
    // }
    // else if (loggedIn) {
    return (
        <>
            <Palette />
            <div className="content">
                <Navbar />
                <Router className="router">{...appRoutes}</Router>
            </div>
            <AlertBase />
            <ModalBase />
        </>
    );
    // }
    // return (
    //     <div className="content">
    //         <PageLayout>
    //             <Auth key="auth" />
    //         </PageLayout>
    //     </div>
    // );
};
