import { includes } from 'ramda';
import { fetchData } from '../hooks/useApi';
import { PostSpiritReturnType, PostSpiritType } from '../types/apiTypes';
import { APISpiritsReturnType } from '../types/spiritsTypes';

export const postSpirit = async ({ token, data, fetch }: PostSpiritType): Promise<PostSpiritReturnType> => {
    return await fetchData({
        data,
        token,
        ...fetch,
    })
        .then((data: APISpiritsReturnType) => {
            if (includes('TypeError', data?.toString()) || data?.message) {
                return { error: data?.message || 'Connection to server failed: No spirits were saved today!' };
            }
            return { data };
        })
        .catch((error) => {
            return { error };
        });
};
