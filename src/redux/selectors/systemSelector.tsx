import { useSelector } from 'react-redux';
import { StoreState } from '../storeState';
import { SystemLayoutState, SystemSortType, SystemState } from '../types/systemTypes';

export const getSystemState = () => useSelector(({ system }: StoreState): SystemState => system);

export const getSystemLayoutState = () => getSystemState()?.layout;

type GetSpecificSystemLayoutStateType = {
    page: keyof SystemLayoutState;
};

export const getSpecificSystemLayoutState = ({ page }: GetSpecificSystemLayoutStateType) =>
    getSystemState()?.layout[page];

export const getSystemLayoutColumnsState = ({ page }: GetSpecificSystemLayoutStateType) =>
    getSystemState()?.layout[page]?.columns;

type GetSpecificSortStateType = {
    page: keyof SystemSortType;
};

export const getSystemSortState = ({ page }: GetSpecificSortStateType) => getSystemState()?.sort[page];
