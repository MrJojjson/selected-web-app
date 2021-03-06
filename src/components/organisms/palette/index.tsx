import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';
import { PaletteBottomPanel } from './paletteBottomPanel';
import { PaletteMiddlePanel } from './paletteMiddlePanel';
import { PaletteTopPanel } from './paletteTopPanel';

import './palette.style.scss';
import { Hamburger } from '../../atoms';
import { Location } from '@reach/router';

export const Palette = () => {
    const loggedIn = getAuthLoggedInState();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    return (
        <Location>
            {({ location }) => {
                return (
                    <>
                        <aside
                            className={cn('palette', {
                                logged_in: loggedIn,
                                open_mobile: mobileOpen,
                            })}
                        >
                            <PaletteTopPanel onClick={() => setMobileOpen(false)} />
                            <PaletteMiddlePanel />
                            <PaletteBottomPanel />
                        </aside>
                        <Hamburger
                            className="palette_hamburger_menu"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            open={mobileOpen}
                        />
                    </>
                );
            }}
        </Location>
    );
};
