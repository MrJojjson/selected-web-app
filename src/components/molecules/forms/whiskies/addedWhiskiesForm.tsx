import { find, map, propEq } from 'ramda';
import React from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { getWhiskiesState, whiskiesRename, whiskiesSelected } from '../../../../redux';
import { getSystemSortState } from '../../../../redux/selectors/systemSelector';
import { WhiskiesDataType } from '../../../../redux/types/whiskyTypes';
import { ApiWhiskyVarsType, WhiskyVarsType } from '../../../../types/whiskyTypes';
import { InputList } from '../lists/inputList';

export const AddedWhiskiesForm = () => {
    const { data, selected, edit } = getWhiskiesState();
    const { type, order } = getSystemSortState({ page: 'whiskies' });

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
    }, sortedData);
    return <>{returnWhiskies}</>;
};
