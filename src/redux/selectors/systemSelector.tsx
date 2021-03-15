import { useSelector } from 'react-redux';
import { StoreState } from '../storeState';
import { SystemLayoutState, SystemState } from '../types/systemTypes';

export const getSystemState = () => useSelector(({ system }: StoreState): SystemState => system);

export const getSystemLayoutState = () => getSystemState()?.layout;

type GetSpecificSystemLayoutStateType = {
    page: keyof SystemLayoutState;
};

export const getSpecificSystemLayoutState = ({ page }: GetSpecificSystemLayoutStateType) =>
    getSystemState()?.layout[page];

export const getSystemLayoutColumnsState = ({ page }: GetSpecificSystemLayoutStateType) =>
    getSystemState()?.layout[page]?.columns;

export const getSystemErrorState = () => getSystemState()?.error;

export const getSystemAlertState = () => getSystemState()?.alert;
