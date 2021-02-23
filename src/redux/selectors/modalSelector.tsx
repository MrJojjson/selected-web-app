import { IStoreState } from '../storeState';
import { ModalState } from '../types/modalTypes';
import { useSelector } from 'react-redux';

export const getModalState = ({ modal }: IStoreState): ModalState => modal;
export const getModalOpenState = () => useSelector(({ modal }: IStoreState): ModalState['open'] => modal.open);
export const getModalContentTypeState = () =>
    useSelector(({ modal }: IStoreState): ModalState['contentType'] => modal.contentType);
