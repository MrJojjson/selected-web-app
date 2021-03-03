import { map } from 'ramda';
import React from 'react';
import { CompLayout } from '../../../../layout/compLayout';
import { getWhiskiesState, whiskiesSelected } from '../../../../redux';
import { WhiskyList } from '../lists/whiskyList';

export const AddedWhiskiesForm = () => {
    const { data, selected, edit } = getWhiskiesState();
    const returnWhiskies = map(({ uid, data, ...rest }) => {
        return (
            <CompLayout key={uid}>
                <WhiskyList
                    uid={uid}
                    selected={selected}
                    onChangeSelect={({ uid }) => whiskiesSelected({ id: uid })}
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
    return <>{returnWhiskies}</>;
};
