import { includes, map } from 'ramda';
import { DateFormatted } from '../common/utils/dateFormat';
import { fetchData } from '../hooks/useApi';
import { CasksDataType } from '../redux/types/casksTypes';
import { FetchCaskReturnType, FetchType } from '../types/apiTypes';
import { APICaskReturnType, ApiCaskVars, ApiCaskVarsType } from '../types/caskTypes';

export const fetchCasks = ({ token }: FetchType): Promise<FetchCaskReturnType> =>
    fetchData({
        endpoint: 'casks',
        token,
    })
        .then((res: APICaskReturnType[]) => {
            if (includes('TypeError', res?.toString())) {
                return { error: 'Connection to server failed' };
            }
            const data = map((rest) => {
                const { id: uid, number: title, createdAtUtc = '---', updatedAtUtc = '---' } = rest;

                const data = map(({ id, title, type }) => {
                    let spirit = { value: rest[id]?.toString(), id, title, type } as ApiCaskVarsType;
                    if (id === 'createdAtUtc' || id === 'updatedAtUtc') {
                        spirit.disabled = true;
                    }
                    return spirit;
                }, ApiCaskVars);

                if (rest?.spirit) {
                    data.push({
                        id: 'spirit',
                        title: 'Spirit name',
                        type: 'text',
                        value: rest?.spirit?.name,
                        belonging: 'spirit',
                    });
                }

                const returnCasks = {
                    data,
                    uid,
                    title,
                    description: `Created: ${DateFormatted({ date: createdAtUtc })}`,
                    meta: `Updated: ${DateFormatted({ date: updatedAtUtc })}`,
                } as CasksDataType;

                return returnCasks;
            }, res);
            return { data };
        })
        .catch((error) => ({ error }));
