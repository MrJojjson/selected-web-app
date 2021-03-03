import { useSelector } from 'react-redux';
import { StoreState } from '../storeState';
import { AuthStateType } from '../types/authTypes';

export const getAuthState = () => useSelector(({ auth }: StoreState): AuthStateType => auth);

export const getAuthLoggedInState = () => useSelector(({ auth }: StoreState): boolean => !!auth.token);

export const getAuthTokenState = () => useSelector(({ auth }: StoreState): AuthStateType['token'] => auth.token);

export const getAuthUserState = () => useSelector(({ auth }: StoreState): AuthStateType['user'] => auth.user);
