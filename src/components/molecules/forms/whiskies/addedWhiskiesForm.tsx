import { map } from 'ramda';
import React from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { getWhiskiesState, whiskiesRename, whiskiesSelected } from '../../../../redux';
import { InputList } from '../lists/inputList';

export const AddedWhiskiesForm = () => {
    const { data, selected, edit } = getWhiskiesState();

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
    }, data);
    return <>{returnWhiskies}</>;
};
