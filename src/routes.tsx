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

type RouteType = { component: JSX.Element; path: toTypes };

const routeList: RouteType[] = [
    {
        path: '/',
        component: (
            <Suspense fallback={<>Loading...</>}>
                <Dashboard />{' '}
            </Suspense>
        ),
    },
    {
        path: '/settings',
        component: (
            <Suspense fallback={<>Loading...</>}>
                <Settings />
            </Suspense>
        ),
    },
    {
        path: '/profile',
        component: (
            <Suspense fallback={<>Loading...</>}>
                <Profile />
            </Suspense>
        ),
    },
    {
        path: '/whiskies',
        component: (
            <Suspense fallback={<>Loading...</>}>
                <Whiskies />
            </Suspense>
        ),
    },
    {
        path: '/purchases',
        component: (
            <Suspense fallback={<>Loading...</>}>
                <Purchases />
            </Suspense>
        ),
    },
    {
        path: '/casks',
        component: (
            <Suspense fallback={<>Loading...</>}>
                <Casks />
            </Suspense>
        ),
    },
];

const routes = map(
    ({ path, component }) => <Route key={path} path={path} render={() => component} />,

    routeList,
);
export default routes;
