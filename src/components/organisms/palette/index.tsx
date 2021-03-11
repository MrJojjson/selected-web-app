import cn from 'classnames';
import React, { useState } from 'react';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';
import { Hamburger } from '../../atoms';
import './palette.style.scss';
import PaletteLinks from './paletteLinks';
import PaletteSystem from './paletteSystem';

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
                <PaletteLinks onClick={() => setMobileOpen(false)} />
                <PaletteSystem />
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
