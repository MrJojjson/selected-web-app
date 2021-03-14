import React from 'react';
import { useDispatch } from 'react-redux';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { getAuthTokenState, setSystemLayoutColumns } from '../../../redux';
import { getSystemLayoutColumnsState } from '../../../redux/selectors/systemSelector';
import { CasksState } from '../../../redux/types/casksTypes';
import { SystemLayoutState } from '../../../redux/types/systemTypes';
import { SpiritsFocusActionType, SpiritsSelectedActionType, SpiritsState } from '../../../redux/types/spiritsTypes';
import { Button } from '../../atoms';
import { NavbarContentTemplate } from '../navbar/navbarContentTemplate';

type EditBarType = {
    state: CasksState | SpiritsState;
    page: keyof SystemLayoutState;
    onToggleEdit: () => void;
    onRedo: () => void;
    onUndo: () => void;
    onFocus: (props: SpiritsFocusActionType) => void;
    onSelected: (props: SpiritsSelectedActionType) => void;
};

export const EditBar = ({ state, page, onToggleEdit, onRedo, onUndo, onFocus, onSelected }: EditBarType) => {
    const dispatch = useDispatch();
    const { mobile } = useWindowSize();

    const { selected, data, edit, history } = state || {};

    const columns = getSystemLayoutColumnsState({ page });
    const token = getAuthTokenState();

    const selectedExists = selected?.length > 0;
    const dataExists = data?.length > 0;
    const allSelected = selected?.length === data.length;

    const { data: histData, disabled, index: histIndex } = history;
    const historyExists = histData?.length > 0;

    const editBtn = (
        <Button
            mini
            label={mobile ? '' : edit ? 'Done' : 'Edit'}
            theme="highlight"
            icon={edit ? 'times' : 'edit'}
            onClick={() => dispatch(onToggleEdit())}
        />
    );

    const redo = (
        <Button
            mini
            onMouseOver={() =>
                dispatch(
                    onFocus({
                        data: histData[histIndex],
                        initiator: 'redo',
                    }),
                )
            }
            onMouseLeave={() =>
                dispatch(
                    onFocus({
                        data: histData[histIndex],
                        remove: true,
                    }),
                )
            }
            disabled={disabled.redo}
            label={mobile ? '' : 'Redo'}
            theme="highlight"
            icon={'redo'}
            onClick={() => (
                dispatch(onRedo()),
                dispatch(
                    onFocus({
                        data: histData[histIndex],
                        remove: true,
                    }),
                )
            )}
        />
    );

    const undo = (
        <Button
            mini
            onMouseOver={() => dispatch(onFocus({ data: histData[histIndex], initiator: 'undo' }))}
            onMouseLeave={() => dispatch(onFocus({ data: histData[histIndex], remove: true }))}
            disabled={disabled.undo}
            label={mobile ? '' : 'Undo'}
            theme="highlight"
            icon="undo"
            onClick={() => (dispatch(onUndo()), dispatch(onFocus({ data: histData[histIndex], remove: true })))}
        />
    );

    const selectAll = (
        <Button
            mini
            label={mobile ? '' : allSelected ? 'Deselect all' : 'Select all'}
            theme="secondary"
            icon={allSelected ? 'minus-square' : 'plus-square'}
            onClick={() => dispatch(onSelected({ all: !allSelected }))}
        />
    );

    const remove = (
        <Button
            mini
            label={mobile ? '' : 'Remove'}
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(onSelected({ remove: true }))}
        />
    );

    const clear = (
        <Button
            mini
            label={mobile ? '' : 'Clear selected'}
            theme="primary"
            icon="minus-square"
            onClick={() => dispatch(onSelected({ clear: true }))}
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
                    setSystemLayoutColumns({ page: 'spirits', columns: columnsCarousel.toString() as typeof columns }),
                )
            }
        />
    );

    const onSubmit = () => {
        // map(async ({ data: addedData }) => {
        //     const data = mergeAll(map(({ id, value }) => ({ [id]: value }), addedData));
        //     await fetchData({
        //         method: 'post',
        //         endpoint: 'spirits',
        //         data,
        //         token,
        //     })
        //         .then((res) => {
        //             dispatch(purchaseIncomingSelected({ all: true }));
        //             dispatch(spiritsSetFetch({ fetch: true }));
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
