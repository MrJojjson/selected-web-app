import React from 'react';
import {
    getWhiskiesState,
    setWhiskiesRemoteFocus,
    whiskiesRedo,
    whiskiesSelected,
    whiskiesToggleEdit,
    whiskiesUndo,
} from '../../../../redux';
import { EditBar } from '../../bars/editBar';

const WhiskyNav = () => (
    <EditBar
        page="whiskies"
        state={getWhiskiesState()}
        onToggleEdit={whiskiesToggleEdit}
        onRedo={whiskiesRedo}
        onUndo={whiskiesUndo}
        onFocus={setWhiskiesRemoteFocus}
        onSelected={whiskiesSelected}
    />
);

export default WhiskyNav;
