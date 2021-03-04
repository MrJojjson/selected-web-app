import React from 'react';
import { useDispatch } from 'react-redux';
import {
    getAuthTokenState,
    getWhiskiesState,
    whiskiesRedo,
    whiskiesSelected,
    whiskiesToggleEdit,
} from '../../../../redux';
import { Button } from '../../../atoms';
import { NavbarContentTemplate } from '../navbarContentTemplate';

export const WhiskyNav = () => {
    const dispatch = useDispatch();
    const { selected, data, edit, history } = getWhiskiesState();
    const token = getAuthTokenState();

    const selectedExists = selected?.length > 0;
    const dataExists = data?.length > 0;

    const allSelected = selected?.length === data.length;
    const historyExists = history?.length > 0;
    const editBtn = (
        <Button
            mini
            label={edit ? 'Done' : 'Edit'}
            theme="highlight"
            icon={edit ? 'times' : 'edit'}
            onClick={() => dispatch(whiskiesToggleEdit())}
        />
    );

    const redo = (
        <Button mini label={'Redo'} theme="highlight" icon={'redo'} onClick={() => dispatch(whiskiesRedo())} />
    );

    const selectAll = (
        <Button
            mini
            label={allSelected ? 'Deselect all' : 'Select all'}
            theme="secondary"
            icon={allSelected ? 'minus-square' : 'plus-square'}
            onClick={() => dispatch(whiskiesSelected({ all: !allSelected }))}
        />
    );

    const remove = (
        <Button
            mini
            label="Remove"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(whiskiesSelected({ remove: true }))}
        />
    );

    const clear = (
        <Button
            mini
            label="Clear selected"
            theme="primary"
            icon="minus-square"
            onClick={() => dispatch(whiskiesSelected({ clear: true }))}
        />
    );

    const onSubmit = () => {
        // map(async ({ data: addedData }) => {
        //     const data = mergeAll(map(({ id, value }) => ({ [id]: value }), addedData));
        //     await fetchData({
        //         method: 'post',
        //         endpoint: 'whiskies',
        //         data,
        //         token,
        //     })
        //         .then((res) => {
        //             dispatch(purchaseIncomingSelected({ all: true }));
        //             dispatch(whiskiesSetFetch({ fetch: true }));
        //             setTimeout(() => {
        //                 dispatch(purchaseIncomingSelected({ remove: true }));
        //             }, 2500);
        //         })
        //         .catch((err) => console.log('err', err));
        // }, added);
    };

    const submit = <Button mini label="Save" theme="highlight" icon="save" onClick={onSubmit} />;

    const startBar = (
        <>
            {edit && dataExists && selectAll}
            {edit && selectedExists && !allSelected && clear}
            {edit && selectedExists && remove}
            {historyExists && submit}
        </>
    );

    const endBar = (
        <>
            {historyExists && redo}
            {editBtn}
        </>
    );

    return <NavbarContentTemplate start={startBar} end={endBar} />;
};
