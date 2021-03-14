import { useLocation } from 'react-router-dom';
import { find, includes } from 'ramda';
import React, { lazy, Suspense } from 'react';
const DashboardNav = lazy(() => import('./content/dashboard'));
const CaskNav = lazy(() => import('./content/cask'));
const SpiritNav = lazy(() => import('./content/spirit'));
const ProfileNav = lazy(() => import('./content/profile'));
const SettingseNav = lazy(() => import('./content/settings'));
const PurchaseNav = lazy(() => import('./content/purchase'));

import { LoadingIndicator } from '../../atoms/loading';

import './navbar.style.scss';

const navList: { path: string; comp: JSX.Element }[] = [
    {
        path: 'dashboard',
        comp: (
            <Suspense fallback={<LoadingIndicator />}>
                <DashboardNav />
            </Suspense>
        ),
    },
    {
        path: 'purchases',
        comp: (
            <Suspense fallback={<LoadingIndicator />}>
                <PurchaseNav />
            </Suspense>
        ),
    },
    {
        path: 'cask',
        comp: (
            <Suspense fallback={<LoadingIndicator />}>
                <CaskNav />
            </Suspense>
        ),
    },
    {
        path: 'spirits',
        comp: (
            <Suspense fallback={<LoadingIndicator />}>
                <SpiritNav />
            </Suspense>
        ),
    },
    {
        path: 'profile',
        comp: (
            <Suspense fallback={<LoadingIndicator />}>
                <ProfileNav />
            </Suspense>
        ),
    },
    {
        path: 'settings',
        comp: (
            <Suspense fallback={<LoadingIndicator />}>
                <SettingseNav />
            </Suspense>
        ),
    },
];

const Navbar = () => {
    const { pathname } = useLocation();
    const { comp } =
        find(({ path }) => {
            return includes(path, pathname);
        }, navList) || {};

    return <header id="navbar">{comp}</header>;
};

export default Navbar;
