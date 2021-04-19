import { filter, find, includes, isEmpty, map, propEq, reject } from 'ramda';
import React from 'react';
import { DateFormatted } from '../../../../common/utils/dateFormat';
import { useQuery } from '../../../../hooks/useQuery';
import { CompLayout } from '../../../../layout/compLayout';
import { casksRename, casksSelected } from '../../../../redux/actions/casksActions';
import { getCasksExpandAllState, getCasksState } from '../../../../redux/selectors/casksSelector';
import { CasksDataType } from '../../../../redux/types/casksTypes';
import { ApiCaskVarsType } from '../../../../types/caskTypes';
import { InputList } from '../lists/inputList';

export const AddedCasksForm = () => {
    const { data = [], selected = [], edit } = getCasksState() || {};
    const { query } = useQuery({});
    const expandAll = getCasksExpandAllState();
    const { filter: queryFilters, sort: querySort } = query || {};

    const diff = ({ data: nextData }: CasksDataType, { data: postData }: CasksDataType) => {
        const { by, order } = querySort || {};
        const { value: nextValue } = find(propEq('id', by))(nextData) as ApiCaskVarsType;
        const { value: postValue } = find(propEq('id', by))(postData) as ApiCaskVarsType;

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

    const returnCasks = map(({ uid, data, ...rest }) => {
        return (
            <CompLayout key={uid}>
                <InputList
                    uid={uid}
                    selected={selected}
                    onChangeSelect={({ uid }) => casksSelected({ id: uid })}
                    onBlurInput={(props) => casksRename({ ...props })}
                    data={[{ data, uid }]}
                    overrideOpen={expandAll}
                    edit={edit}
                    {...rest}
                />
            </CompLayout>
        );
    }, filteredData);
    return <>{returnCasks}</>;
};
