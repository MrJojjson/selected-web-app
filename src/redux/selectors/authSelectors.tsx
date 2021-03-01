import { StoreState } from '../storeState';
import { ModalState } from '../types/modalTypes';
import { useSelector } from 'react-redux';
import { AuthStateType } from '../types/authTypes';

export const getAuthState = ({ auth }: StoreState): AuthStateType => auth;

export const getAuthLoggedInState = () =>
    useSelector(({ auth }: StoreState): AuthStateType['loggedIn'] => auth.loggedIn);

export const getAuthTokenState = () => useSelector(({ auth }: StoreState): AuthStateType['token'] => auth.token);
