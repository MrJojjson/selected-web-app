import { AxiosError } from 'axios';
import { CasksDataType } from '../redux/types/casksTypes';
import { SpiritsDataType } from '../redux/types/spiritsTypes';

export type UseApiReturn = {
    data: any;
    loading: boolean;
    error: AxiosError<any>;
};

export type ApiEndpointTypes = 'users' | 'authenticate' | 'casks' | 'spirits' | 'rerack';
export type ApiMethodTypes = 'get' | 'post' | 'put' | 'delete';

export type UseApiType = {
    endpoint?: ApiEndpointTypes | ApiEndpointTypes[];
    id?: string;
    idPos?: number;
    method?: ApiMethodTypes;
    params?: any;
    data?: any;
    token?: string;
};

export type FetchType = {
    token: string;
};

export type FetchSpiritReturnType = {
    error?: string;
    data?: SpiritsDataType[];
};

export type FetchCaskReturnType = {
    error?: string;
    data?: CasksDataType[];
};
