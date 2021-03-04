import { RouteComponentProps } from '@reach/router';
import { map } from 'ramda';
import React from 'react';
import { Casks } from './pages/casks';
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';
import { Purchases } from './pages/purchases';
import { Settings } from './pages/settings';
import { Whiskies } from './pages/whiskies';
import { toTypes } from './types/linkTypes';

const Route = (props: { component: JSX.Element } & RouteComponentProps) => props.component;

type RouteType = { component: JSX.Element; path: toTypes } & Omit<RouteComponentProps, 'path'>;

const routeList: RouteType[] = [
    {
        path: '/',
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
        path: '/whiskies',
        component: <Whiskies />,
    },
    {
        path: '/purchases',
        component: <Purchases />,
    },
    {
        path: '/casks',
        component: <Casks />,
    },
];

const routes = map((route) => <Route key={route.path} {...route} />, routeList);
export default routes;
