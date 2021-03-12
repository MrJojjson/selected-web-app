import { StoreState } from '../storeState';
import { WhiskiesState } from '../types/whiskyTypes';
import { useSelector } from 'react-redux';

export const getWhiskiesState = () => useSelector(({ whiskies }: StoreState): WhiskiesState => whiskies);

export const getWhiskiesSelectedState = () => getWhiskiesState()?.selected;

export const getWhiskiesAddState = () => getWhiskiesState()?.data;

export const getWhiskiesFetchState = () => getWhiskiesState()?.fetch;

export const getWhiskiesEditState = () => getWhiskiesState()?.edit;

export const getWhiskiesExpandAllState = () => getWhiskiesState()?.expandAll;
