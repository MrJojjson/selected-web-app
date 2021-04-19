import { map } from 'ramda';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toTypes } from './types/linkTypes';

const Casks = lazy(() => import('./pages/casks'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const Purchases = lazy(() => import('./pages/purchases'));
const Settings = lazy(() => import('./pages/settings'));
const Spirits = lazy(() => import('./pages/spirits'));
const Projects = lazy(() => import('./pages/projects'));
const Events = lazy(() => import('./pages/events'));

import { LoadingIndicator } from './components/atoms/loading';
import { QueryProvider } from './providers/QueryProvider';

type RouteType = { component: JSX.Element; path: toTypes };

const routeList: RouteType[] = [
    {
        path: '/dashboard',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Dashboard />
            </Suspense>
        ),
    },
    {
        path: '/settings',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Settings />
            </Suspense>
        ),
    },
    {
        path: '/profile',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Profile />
            </Suspense>
        ),
    },
    {
        path: '/spirits',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <QueryProvider id="spirits">
                    <Spirits />
                </QueryProvider>
            </Suspense>
        ),
    },
    {
        path: '/purchases',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Purchases />
            </Suspense>
        ),
    },
    {
        path: '/casks',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <QueryProvider id="casks">
                    <Casks />
                </QueryProvider>
            </Suspense>
        ),
    },
    {
        path: '/projects',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Projects />
            </Suspense>
        ),
    },
    {
        path: '/events',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Events />
            </Suspense>
        ),
    },
];

const routes = map(({ path, component }) => {
    return <Route key={path} path={path} render={() => component} />;
}, routeList);

export default <Switch>{routes}</Switch>;
