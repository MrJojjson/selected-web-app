import cn from 'classnames';
import React from 'react';
import styles from '../../../../styles/organisms/palette.module.scss';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';
import { Text } from '../../atoms';

export const Palette = () => {
    const loggedIn = getAuthLoggedInState();
    return (
        <aside
            className={cn(styles.palette, {
                [styles.logged_in]: loggedIn,
            })}
        >
            <div id="palette_top_panel" className={styles.top}>
                <Text>
                    This could be a panel for different projects that users create - or sites (dashboard graphs, data
                    etc.) related to selected management.
                </Text>
            </div>
            <div id="palette_middle_panel" className={styles.middle}>
                <Text>Display pages and easy navigation between these.</Text>
            </div>
            <div id="palette_bottom_panel" className={styles.bottom}>
                <Text theme="secondary">Maybe settings for the application - version number and such.</Text>
            </div>
        </aside>
    );
};
