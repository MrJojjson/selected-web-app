import { useSelector } from 'react-redux';
import { StoreState } from '../storeState';
import { CasksState } from '../types/casksTypes';

export const getCasksState = () => useSelector(({ casks }: StoreState): CasksState => casks);

export const getCasksSelectedState = () => getCasksState()?.selected;

export const getCasksAddState = () => getCasksState()?.data;

export const getCasksFetchState = () => getCasksState()?.fetch;

export const getCasksEditState = () => getCasksState()?.edit;

export const getCasksExpandAllState = () => getCasksState()?.expandAll;
