import React from 'react';
import { Button, Text } from '../../atoms';
import { navigate } from '@reach/router';

import './palette.style.scss';

export const PaletteBottomPanel = () => {
    return (
        <div id="palette_bottom_panel" className="bottom">
            <Button className="btn_settings" icon="cogs" label="Settings" onClick={() => navigate('/settings')} />
            {/* <Text fontSize="s" theme="secondary">{`Version: ${env.REACT_APP_VERSION}`}</Text> */}
        </div>
    );
};
