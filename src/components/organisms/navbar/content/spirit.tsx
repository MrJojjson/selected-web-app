import React from 'react';
import {
    getSpiritsState,
    setSpiritsRemoteFocus,
    spiritsRedo,
    spiritsSelected,
    spiritsToggleEdit,
    spiritsUndo,
} from '../../../../redux';
import { EditBar } from '../../bars/editBar';

const SpiritNav = () => (
    <EditBar
        page="spirits"
        state={getSpiritsState()}
        onToggleEdit={spiritsToggleEdit}
        onRedo={spiritsRedo}
        onUndo={spiritsUndo}
        onFocus={setSpiritsRemoteFocus}
        onSelected={spiritsSelected}
    />
);

export default SpiritNav;
