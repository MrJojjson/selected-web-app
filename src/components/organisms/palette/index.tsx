import cn from 'classnames';
import React, { lazy, Suspense, useState } from 'react';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';

const PaletteLinks = lazy(() => import('./paletteLinks'));
const PaletteSystem = lazy(() => import('./paletteSystem'));

import './palette.style.scss';
import { Hamburger, LoadingIndicator } from '../../atoms';

const Palette = () => {
    const loggedIn = getAuthLoggedInState();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    return (
        <>
            <aside
                className={cn('palette', {
                    logged_in: loggedIn,
                    open_mobile: mobileOpen,
                })}
            >
                <Suspense fallback={<LoadingIndicator />}>
                    <PaletteLinks onClick={() => setMobileOpen(false)} />
                    <PaletteSystem />
                </Suspense>
            </aside>
            <Hamburger
                className="palette_hamburger_menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                open={mobileOpen}
            />
        </>
    );
};

export default Palette;
