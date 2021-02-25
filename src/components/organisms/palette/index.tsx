import cn from 'classnames';
import React from 'react';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';
import { PaletteBottomPanel } from './paletteBottomPanel';
import { PaletteMiddlePanel } from './paletteMiddlePanel';
import { PaletteTopPanel } from './paletteTopPanel';

import './palette.style.scss';

export const Palette = () => {
    const loggedIn = getAuthLoggedInState();

    return (
        <aside
            className={cn('palette', {
                logged_in: loggedIn,
            })}
        >
            <PaletteTopPanel />
            <PaletteMiddlePanel />
            <PaletteBottomPanel />
        </aside>
    );
};
