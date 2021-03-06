import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import {
    getAuthTokenState,
    getWhiskiesState,
    setWhiskiesRemoteFocus,
    setSystemLayoutColumns,
    whiskiesRedo,
    whiskiesSelected,
    whiskiesToggleEdit,
    whiskiesUndo,
} from '../../../../redux';
import { getSystemLayoutColumnsState } from '../../../../redux/selectors/systemSelector';
import { Button } from '../../../atoms';
import { NavbarContentTemplate } from '../navbarContentTemplate';

export const WhiskyNav = () => {
    const dispatch = useDispatch();
    const { selected, data, edit, history } = getWhiskiesState();
    const columns = getSystemLayoutColumnsState({ page: 'whiskies' });
    const token = getAuthTokenState();

    const selectedExists = selected?.length > 0;
    const dataExists = data?.length > 0;

    const allSelected = selected?.length === data.length;
    const { data: histData, disabled, index: histIndex } = history;
    const { mobile } = useWindowSize();
    const historyExists = histData?.length > 0;

    const editBtn = (
        <Button
            mini
            label={mobile ? '' : edit ? 'Done' : 'Edit'}
            theme="highlight"
            icon={edit ? 'times' : 'edit'}
            onClick={() => dispatch(whiskiesToggleEdit())}
        />
    );

    const redo = (
        <Button
            mini
            disabled={disabled.redo}
            label={mobile ? '' : 'Redo'}
            theme="highlight"
            icon={'redo'}
            onClick={() => dispatch(whiskiesRedo())}
        />
    );

    const undo = (
        <Button
            mini
            onMouseOver={() => dispatch(setWhiskiesRemoteFocus({ data: histData[histIndex] }))}
            onMouseLeave={() => dispatch(setWhiskiesRemoteFocus({ data: histData[histIndex], remove: true }))}
            disabled={disabled.undo}
            label={mobile ? '' : 'Undo'}
            theme="highlight"
            icon="undo"
            onClick={() => (
                dispatch(whiskiesUndo()), dispatch(setWhiskiesRemoteFocus({ data: histData[histIndex], remove: true }))
            )}
        />
    );

    const selectAll = (
        <Button
            mini
            label={mobile ? '' : allSelected ? 'Deselect all' : 'Select all'}
            theme="secondary"
            icon={allSelected ? 'minus-square' : 'plus-square'}
            onClick={() => dispatch(whiskiesSelected({ all: !allSelected }))}
        />
    );

    const remove = (
        <Button
            mini
            label={mobile ? '' : 'Remove'}
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(whiskiesSelected({ remove: true }))}
        />
    );

    const clear = (
        <Button
            mini
            label={mobile ? '' : 'Clear selected'}
            theme="primary"
            icon="minus-square"
            onClick={() => dispatch(whiskiesSelected({ clear: true }))}
        />
    );
    let columnsNr = Number(columns);
    let columnsCarousel = columnsNr + 1;
    if (columnsCarousel > 4) {
        columnsCarousel = 1;
    }
    const layout = (
        <Button
            mini
            label={`${columnsNr} -> ${columnsCarousel}`}
            theme="highlight"
            icon="columns"
            onClick={() =>
                dispatch(
                    setSystemLayoutColumns({ page: 'whiskies', columns: columnsCarousel.toString() as typeof columns }),
                )
            }
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

    const submit = <Button mini label={mobile ? '' : 'Save'} theme="highlight" icon="save" onClick={onSubmit} />;

    const startBar = (
        <>
            {edit && dataExists && selectAll}
            {edit && selectedExists && !allSelected && clear}
            {edit && selectedExists && remove}
            {!disabled.undo && historyExists && submit}
        </>
    );

    const endBar = (
        <>
            {edit && historyExists && undo}
            {edit && historyExists && redo}
            {editBtn}
            {!mobile && layout}
        </>
    );

    return <NavbarContentTemplate start={startBar} end={endBar} />;
};
