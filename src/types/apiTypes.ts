import { AxiosError } from 'axios';
import { CasksDataType } from '../redux/types/casksTypes';
import { SpiritsDataType } from '../redux/types/spiritsTypes';
import { APICaskReturnType, CaskType } from './caskTypes';
import { APISpiritsReturnType, SpiritType } from './spiritsTypes';

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

export type PostType = {
    token: string;
    fetch?: UseApiType;
};

export type PostCaskType = PostType & {
    data: CaskType;
};

export type PostCaskReturnType = {
    error?: string;
    data?: APICaskReturnType;
};

export type PostSpiritType = PostType & {
    data: {
        spirit: SpiritType;
        caskId?: CaskType['id'];
    };
};

export type PostSpiritReturnType = {
    error?: string;
    data?: APISpiritsReturnType;
};
