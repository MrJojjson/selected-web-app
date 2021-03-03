import { AxiosError } from 'axios';

export type UseApiReturn = {
    data: any;
    loading: boolean;
    error: AxiosError<any>;
};

export type ApiEndpointTypes = 'users' | 'authenticate' | 'casks' | 'whiskies' | 'rerack';
export type ApiMethodTypes = 'get' | 'post' | 'put' | 'delete';

export type UseApiType = {
    endpoint: ApiEndpointTypes | ApiEndpointTypes[];
    id?: string;
    idPos?: number;
    method?: ApiMethodTypes;
    params?: any;
    data?: any;
    token?: string;
};
