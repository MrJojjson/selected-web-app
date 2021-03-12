import { filter, find, includes, isEmpty, map, propEq, reject } from 'ramda';
import React from 'react';
import { DateFormatted } from '../../../../common/utils/dateFormat';
import { useQuery } from '../../../../hooks/useQuery';
import { CompLayout } from '../../../../layout/compLayout';
import { getWhiskiesState, whiskiesRename, whiskiesSelected } from '../../../../redux';
import { getSystemSortState } from '../../../../redux/selectors/systemSelector';
import { WhiskiesDataType } from '../../../../redux/types/whiskyTypes';
import { ApiWhiskyVarsType } from '../../../../types/whiskyTypes';
import { InputList } from '../lists/inputList';

export const AddedWhiskiesForm = () => {
    const { data, selected, edit } = getWhiskiesState();
    const { type, order } = getSystemSortState({ page: 'whiskies' });
    const { queryType, query } = useQuery({});

    const diff = ({ data: nextData }: WhiskiesDataType, { data: postData }: WhiskiesDataType) => {
        const { value: nextValue } = find(propEq('id', type))(nextData) as ApiWhiskyVarsType;
        const { value: postValue } = find(propEq('id', type))(postData) as ApiWhiskyVarsType;

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
    const sortedData = data.sort(diff) || data;

    const filteredData = !isEmpty(queryType)
        ? reject(({ data }) => {
              const exists =
                  filter(({ id, value, type }) => {
                      queryType?.filter;
                      if (queryType['filter'][id]) {
                          if (type === 'date') {
                              const year = DateFormatted({ date: value, options: { year: 'numeric' } });
                              return includes(year, queryType[id]);
                          }
                          if (value && type === 'number' && queryType[id]?.length >= 2) {
                              const min = Number(queryType[id][0]);
                              const max = Number(queryType[id][1]);
                              const nrValue = Number(value);
                              return nrValue >= min && nrValue <= max;
                          }
                          return includes(value, queryType[id]);
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
