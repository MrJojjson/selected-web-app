import { RouteComponentProps } from '@reach/router';
import { map } from 'ramda';
import React from 'react';
import { Casks } from './pages/casks';
import { Dashboard } from './pages/dashboard';
import { Home } from './pages/home';
import { Liquor } from './pages/liquor';
import { Profile } from './pages/profile';
import { Purchases } from './pages/purchases';
import { Settings } from './pages/settings';
import { PageLayout } from './layout/pageLayout';
import { toTypes } from './types/linkTypes';

const Route = (props: { component: JSX.Element } & RouteComponentProps) => props.component;

type RouteType = { component: JSX.Element; path: toTypes } & Omit<RouteComponentProps, 'path'>;

const layout = (component: RouteType['component']) => <PageLayout>{component}</PageLayout>;

const routeList: RouteType[] = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/dashboard',
        component: <Dashboard />,
    },
    {
        path: '/settings',
        component: <Settings />,
    },
    {
        path: '/profile',
        component: <Profile />,
    },
    {
        path: '/liqour',
        component: <Liquor />,
    },
    {
        path: '/puchases',
        component: <Purchases />,
    },
    {
        path: '/casks',
        component: <Casks />,
    },
];

const routes = map((route) => <Route key={route.path} {...route} />, routeList);
export default routes;
