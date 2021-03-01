import { StoreState } from '../storeState';
import { ModalState } from '../types/modalTypes';
import { useSelector } from 'react-redux';

export const getModalState = ({ modal }: StoreState): ModalState => modal;
export const getModalOpenState = () => useSelector(({ modal }: StoreState): ModalState['open'] => modal.open);
export const getModalContentTypeState = () =>
    useSelector(({ modal }: StoreState): ModalState['contentType'] => modal.contentType);
