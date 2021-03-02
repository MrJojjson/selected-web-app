import { useLocation } from '@reach/router';
import React from 'react';
import { PurchaseNav } from '../../organisms/navbar/content/purchase';
import './navbar.style.scss';
import { Location } from '@reach/router';
import { find, includes } from 'ramda';
import { DashboardNav } from './content/dashboard';
import { CaskNav } from './content/cask';
import { WhiskyNav } from './content/whisky';
import { ProfileNav } from './content/profile';
import { SettingseNav } from './content/settings';

const navList: { path: string; comp: JSX.Element }[] = [
    {
        path: 'dashboard',
        comp: <DashboardNav />,
    },
    {
        path: 'purchases',
        comp: <PurchaseNav />,
    },
    {
        path: 'cask',
        comp: <CaskNav />,
    },
    {
        path: 'whisky',
        comp: <WhiskyNav />,
    },
    {
        path: 'profile',
        comp: <ProfileNav />,
    },
    {
        path: 'settings',
        comp: <SettingseNav />,
    },
];

export const Navbar = () => {
    return (
        <header id="navbar">
            <Location>
                {({ location }) => find(({ path }) => includes(path, location?.pathname), navList)?.comp}
            </Location>
        </header>
    );
};
