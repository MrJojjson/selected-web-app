import { includes } from 'ramda';
import { fetchData } from '../hooks/useApi';
import { PostCaskReturnType, PostCaskType } from '../types/apiTypes';
import { APICaskReturnType } from '../types/caskTypes';

export const postCask = async ({ token, data, fetch }: PostCaskType): Promise<PostCaskReturnType> => {
    return await fetchData({
        data,
        token,
        method: 'post',
        ...fetch,
    })
        .then((data: APICaskReturnType) => {
            if (includes('TypeError', data?.toString())) {
                return { error: 'Connection to server failed: No casks were saved today!' };
            }
            return { data };
        })
        .catch((error) => ({ error }));
};
