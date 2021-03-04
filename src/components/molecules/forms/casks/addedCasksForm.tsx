import { map } from 'ramda';
import React from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { casksSelected } from '../../../../redux/actions/casksActions';
import { getCasksState } from '../../../../redux/selectors/casksSelector';
import { InputList } from '../lists/inputList';

export const AddedCasksForm = () => {
    const { data, selected, edit } = getCasksState();
    const returnCasks = map(({ uid, data, ...rest }) => {
        return (
            <CompLayout key={uid}>
                <InputList
                    uid={uid}
                    selected={selected}
                    onChangeSelect={({ uid }) => casksSelected({ id: uid })}
                    onBlurInput={(props) => console.log('props', props)}
                    onChangeWorkingTitle={(props) => console.log('props', props)}
                    data={[{ data, uid }]}
                    overrideOpen={false}
                    edit={edit}
                    {...rest}
                />
            </CompLayout>
        );
    }, data);
    return <>{returnCasks}</>;
};
