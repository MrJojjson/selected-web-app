import React from 'react';
import {
    casksRedo,
    casksSelected,
    casksToggleEdit,
    casksUndo,
    setCasksRemoteFocus,
} from '../../../../redux/actions/casksActions';
import { getCasksState } from '../../../../redux/selectors/casksSelector';
import { EditBar } from '../../bars/editBar';

export const CaskNav = () => (
    <EditBar
        page="casks"
        state={getCasksState()}
        onToggleEdit={casksToggleEdit}
        onRedo={casksRedo}
        onUndo={casksUndo}
        onFocus={setCasksRemoteFocus}
        onSelected={casksSelected}
    />
);
