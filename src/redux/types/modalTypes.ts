export const MODAL_TOGGLE = 'MODAL_TOGGLE';

export type ModalStateContentType = 'signup' | 'login' | 'menu' | 'undefined';

export type ModalState = {
    open: boolean;
    contentType: ModalStateContentType;
};

export type ModalToggleOpenAction = {
    type: 'MODAL_TOGGLE';
    override?: boolean;
    contentType: ModalStateContentType;
};

export type ModalActions = ModalToggleOpenAction;
