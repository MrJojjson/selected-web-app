import { map } from 'ramda';
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { toTypes } from './types/linkTypes';

const Casks = lazy(() => import('./pages/casks'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const Purchases = lazy(() => import('./pages/purchases'));
const Settings = lazy(() => import('./pages/settings'));
const Whiskies = lazy(() => import('./pages/whiskies'));
import { LoadingIndicator } from './components/atoms/loading';

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
        path: '/whiskies',
        component: (
            <Suspense fallback={<LoadingIndicator />}>
                <Whiskies />
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
                <Casks />
            </Suspense>
        ),
    },
];

const routes = map(({ path, component }) => {
    return <Route key={path} path={path} render={() => component} />;
}, routeList);

export default routes;
