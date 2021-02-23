import { ModalState, MODAL_TOGGLE } from '../types/modalTypes';

type ModalToggleOpenType = Pick<ModalState, 'contentType'> & {
    override?: ModalState['open'];
};

export const modalToggleOpen = ({ ...props }: ModalToggleOpenType) => ({
    type: MODAL_TOGGLE,
    ...props,
});
