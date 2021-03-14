import { StoreState } from '../storeState';
import { SpiritsState } from '../types/spiritsTypes';
import { useSelector } from 'react-redux';

export const getSpiritsState = () => useSelector(({ spirits }: StoreState): SpiritsState => spirits);

export const getSpiritsSelectedState = () => getSpiritsState()?.selected;

export const getSpiritsAddState = () => getSpiritsState()?.data;

export const getSpiritsFetchState = () => getSpiritsState()?.fetch;

export const getSpiritsEditState = () => getSpiritsState()?.edit;

export const getSpiritsExpandAllState = () => getSpiritsState()?.expandAll;
