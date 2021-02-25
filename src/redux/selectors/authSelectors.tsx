import { IStoreState } from '../storeState';
import { ModalState } from '../types/modalTypes';
import { useSelector } from 'react-redux';
import { AuthStateType } from '../types/authTypes';

export const getAuthState = ({ auth }: IStoreState): AuthStateType => auth;

export const getAuthLoggedInState = () =>
    useSelector(({ auth }: IStoreState): AuthStateType['loggedIn'] => auth.loggedIn);

export const getAuthTokenState = () => useSelector(({ auth }: IStoreState): AuthStateType['token'] => auth.token);
