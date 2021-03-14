import { includes, map } from 'ramda';
import { DateFormatted } from '../common/utils/dateFormat';
import { fetchData } from '../hooks/useApi';
import { SpiritsDataType } from '../redux/types/spiritsTypes';
import { FetchSpiritReturnType, FetchType } from '../types/apiTypes';
import { APISpiritsReturnType, ApiSpiritVars, ApiSpiritVarsType } from '../types/spiritsTypes';

export const fetchSpirits = ({ token }: FetchType): Promise<FetchSpiritReturnType> =>
    fetchData({
        endpoint: 'spirits',
        token,
    })
        .then((res: APISpiritsReturnType[]) => {
            if (includes('TypeError', res?.toString())) {
                return { error: 'Connection to server failed' };
            }
            const data = map((rest) => {
                const { id: uid, name: title, createdAtUtc = '---', updatedAtUtc = '---' } = rest;

                const result = map(({ id, title, type }) => {
                    let spirit = { value: rest[id]?.toString(), id, title, type } as ApiSpiritVarsType;
                    if (id === 'createdAtUtc' || id === 'updatedAtUtc') {
                        spirit.disabled = true;
                    }
                    return spirit;
                }, ApiSpiritVars);

                if (rest?.cask) {
                    result.push({
                        id: 'cask',
                        title: 'Cask name',
                        type: 'text',
                        value: rest?.cask?.number,
                        belonging: 'cask',
                    });
                }

                const returnSpirit = {
                    data: result,
                    uid,
                    title,
                    description: `Created: ${DateFormatted({ date: createdAtUtc })}`,
                    meta: `Updated: ${DateFormatted({ date: updatedAtUtc })}`,
                } as SpiritsDataType;

                return returnSpirit;
            }, res);

            return { data };
        })
        .catch((error) => ({ error }));
