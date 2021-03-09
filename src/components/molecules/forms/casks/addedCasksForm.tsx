import { find, map, propEq } from 'ramda';
import React from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { casksRename, casksSelected } from '../../../../redux/actions/casksActions';
import { getCasksState } from '../../../../redux/selectors/casksSelector';
import { getSystemSortState } from '../../../../redux/selectors/systemSelector';
import { CasksDataType } from '../../../../redux/types/casksTypes';
import { ApiCaskVarsType } from '../../../../types/caskTypes';
import { InputList } from '../lists/inputList';

export const AddedCasksForm = () => {
    const { data, selected, edit } = getCasksState();
    const { type, order } = getSystemSortState({ page: 'casks' });

    const diff = ({ data: nextData }: CasksDataType, { data: postData }: CasksDataType) => {
        const { value: nextValue } = find(propEq('id', type))(nextData) as ApiCaskVarsType;
        const { value: postValue } = find(propEq('id', type))(postData) as ApiCaskVarsType;

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

    const returnCasks = map(({ uid, data, ...rest }) => {
        return (
            <CompLayout key={uid}>
                <InputList
                    uid={uid}
                    selected={selected}
                    onChangeSelect={({ uid }) => casksSelected({ id: uid })}
                    onBlurInput={(props) => casksRename({ ...props })}
                    data={[{ data, uid }]}
                    overrideOpen={false}
                    edit={edit}
                    {...rest}
                />
            </CompLayout>
        );
    }, sortedData);
    return <>{returnCasks}</>;
};
