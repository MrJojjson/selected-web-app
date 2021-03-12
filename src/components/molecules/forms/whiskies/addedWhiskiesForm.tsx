import { filter, find, includes, isEmpty, map, propEq, reject } from 'ramda';
import React from 'react';
import { DateFormatted } from '../../../../common/utils/dateFormat';
import { useQuery } from '../../../../hooks/useQuery';
import { CompLayout } from '../../../../layout/compLayout';
import { getWhiskiesState, whiskiesRename, whiskiesSelected } from '../../../../redux';
import { WhiskiesDataType } from '../../../../redux/types/whiskyTypes';
import { ApiWhiskyVarsType } from '../../../../types/whiskyTypes';
import { InputList } from '../lists/inputList';

export const AddedWhiskiesForm = () => {
    const { data, selected, edit } = getWhiskiesState();
    const { query } = useQuery({});
    const { filter: queryFilters, sort: querySort } = query || {};

    const diff = ({ data: nextData }: WhiskiesDataType, { data: postData }: WhiskiesDataType) => {
        const { by, order } = querySort || {};
        const { value: nextValue } = find(propEq('id', by))(nextData) as ApiWhiskyVarsType;
        const { value: postValue } = find(propEq('id', by))(postData) as ApiWhiskyVarsType;

        const modNextValue = nextValue?.replace(/\s/g, '')?.toLowerCase();
        const modPostValue = postValue?.replace(/\s/g, '')?.toLowerCase();

        const isDescend = order === 'descend';
        if (modPostValue < modNextValue) {
            return isDescend ? -1 : 1;
        }
        if (modPostValue > modNextValue) {
            return isDescend ? 1 : -1;
        }

        return 0;
    };

    const sortedData = !isEmpty(querySort) && querySort !== undefined ? data.sort(diff) : data;

    const filteredData =
        !isEmpty(queryFilters) && queryFilters !== undefined
            ? reject(({ data }) => {
                  const exists =
                      filter(({ id, value, type }) => {
                          if (queryFilters[id]) {
                              const queryFiltersId = queryFilters[id];
                              if (type === 'date') {
                                  const year = DateFormatted({ date: value, options: { year: 'numeric' } });
                                  return includes(year, queryFiltersId);
                              }
                              if (value && type === 'number' && queryFiltersId?.length >= 2) {
                                  const min = Number(queryFiltersId[0]);
                                  const max = Number(queryFiltersId[1]);
                                  const nrValue = Number(value);
                                  return nrValue >= min && nrValue <= max;
                              }
                              return includes(value, queryFiltersId);
                          }
                          return false;
                      }, data).length > 0;

                  return !exists;
              }, sortedData)
            : sortedData;

    const returnWhiskies = map(({ uid, data, ...rest }) => {
        return (
            <CompLayout key={uid}>
                <InputList
                    uid={uid}
                    selected={selected}
                    onChangeSelect={({ uid }) => whiskiesSelected({ id: uid })}
                    onBlurInput={(props) => whiskiesRename({ ...props })}
                    data={[{ data, uid }]}
                    overrideOpen={false}
                    edit={edit}
                    {...rest}
                />
            </CompLayout>
        );
    }, filteredData);
    return <>{returnWhiskies}</>;
};
