import { ModalActions, ModalState, MODAL_TOGGLE } from '../types/modalTypes';

const initialState: ModalState = {
    open: false,
    contentType: 'undefined',
};

export const ModalReducer = (state: ModalState = initialState, action: ModalActions) => {
    switch (action.type) {
        case MODAL_TOGGLE:
            return {
                ...state,
                open: action.override || !state.open,
                contentType: action.contentType,
            };
        default:
            return state;
    }
};
