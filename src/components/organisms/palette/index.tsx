import cn from 'classnames';
import React from 'react';
import styles from '../../../../styles/organisms/palette.module.scss';
import { useRouterPush } from '../../../hooks/useRouterPush';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';
import { Button, Text } from '../../atoms';
import { PaletteTopPanel } from './paletteTopPanel';

const pjson = require('../../../../package.json');

export const Palette = () => {
    const loggedIn = getAuthLoggedInState();
    const { onUsePush } = useRouterPush();

    return (
        <aside
            className={cn(styles.palette, {
                [styles.logged_in]: loggedIn,
            })}
        >
            <PaletteTopPanel />
            <div id="palette_middle_panel" className={styles.middle}>
                <Text>Display information/navigaton/management for actual page.</Text>
            </div>
            <div id="palette_bottom_panel" className={styles.bottom}>
                <Button
                    className={styles.btn_settings}
                    icon="cogs"
                    label="Settings"
                    onClick={() => onUsePush({ to: '/settings' })}
                />
                <Text fontSize="s" theme="secondary">{`Version: ${pjson.version}`}</Text>
            </div>
        </aside>
    );
};
