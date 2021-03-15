import { isEmpty, map, mergeAll } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { postCask } from '../../../../api/postCask';
import { postSpirit } from '../../../../api/postSpirit';
import { uniqueId } from '../../../../common/utils/uniqueId';
import {
    getAuthTokenState,
    getPurchaseIncomingState,
    purchaseIncomingSelected,
    systemAlertContentLog,
} from '../../../../redux';
import { PostCaskType, PostSpiritType } from '../../../../types/apiTypes';
import { APICaskReturnType, CaskType } from '../../../../types/caskTypes';
import { InputVarsType } from '../../../../types/inputTypes';
import { APISpiritsReturnType, SpiritType } from '../../../../types/spiritsTypes';
import { Button } from '../../../atoms';
import { NavbarContentTemplate } from '../navbarContentTemplate';

const PurchaseNav = () => {
    const dispatch = useDispatch();
    const { selected, added } = getPurchaseIncomingState();
    const token = getAuthTokenState();

    const selectedExists = selected?.length > 0;
    const addedExists = added?.length > 0;

    const allSelected = selected?.length === added.length;

    const selectAll = (
        <Button
            mini
            label={allSelected ? 'Deselect all' : 'Select all'}
            theme="secondary"
            icon={allSelected ? 'minus-square' : 'plus-square'}
            onClick={() => dispatch(purchaseIncomingSelected({ all: !allSelected }))}
        />
    );

    const remove = (
        <Button
            mini
            label="Remove"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    const clear = (
        <Button
            mini
            label="Clear selected"
            theme="primary"
            icon="minus-square"
            onClick={() => dispatch(purchaseIncomingSelected({ clear: true }))}
        />
    );

    const resetIncomingPurchaseFields = (uid?: string) => {
        if (uid) {
            dispatch(purchaseIncomingSelected({ uid }));
        } else {
            dispatch(purchaseIncomingSelected({ all: true }));
        }
        // dispatch(spiritsSetFetch({ fetch: true }));
        setTimeout(() => {
            dispatch(purchaseIncomingSelected({ remove: true }));
        }, 2500);
    };

    const disapatchAlertError = (value: string) => {
        dispatch(systemAlertContentLog({ type: 'error', id: `${uniqueId('server-error')}`, value }));
    };

    const disapatchAlertAction = (value: string) => {
        dispatch(systemAlertContentLog({ type: 'action', id: `${uniqueId('data-saved')}`, value }));
    };

    const saveCask = async ({ data, fetch }: Omit<PostCaskType, 'token'>): Promise<APICaskReturnType | string> => {
        const { data: caskData, error: caskError } = await postCask({ token, data, fetch });
        const { status } = caskData || {};

        if (caskError || (status && status !== 200)) {
            return caskError || status?.toString();
        }
        disapatchAlertAction(`Saved cask: ${caskData?.number}.`);
        return caskData;
    };

    const saveSpirit = async ({
        data,
        fetch,
    }: Omit<PostSpiritType, 'token'>): Promise<APISpiritsReturnType | string> => {
        const { data: spriritData, error: spritError } = await postSpirit({ token, data, fetch });
        const { status } = spriritData || {};

        if (spritError || (status && status !== 200)) {
            return spritError;
        }
        disapatchAlertAction(`Saved spirit: ${spriritData?.name}.`);

        return spriritData;
    };

    const mergeData = (data: InputVarsType[], belongsTo: 'cask' | 'spirit') => {
        return mergeAll(
            map(({ id, value, belonging }) => {
                if (belonging === belongsTo) {
                    return { [(id as unknown) as string]: value };
                }
            }, data),
        );
    };

    const onSubmit = () => {
        map(async ({ data, fetch, preFetch, uid }) => {
            const spirit = mergeData(data, 'spirit') as SpiritType;
            const cask = mergeData(data, 'cask') as CaskType;
            let error = null;
            if (!isEmpty(spirit) && !isEmpty(cask) && !isEmpty(preFetch)) {
                error = await saveCask({ data: cask, fetch: preFetch }).then((caskData: APICaskReturnType) =>
                    saveSpirit({ data: { spirit, caskId: caskData?.id }, fetch }),
                );
            } else if (!isEmpty(spirit)) {
                error = await saveSpirit({ data: { spirit }, fetch });
            } else if (!isEmpty(cask)) {
                error = await saveCask({ data: cask, fetch });
            }
            if (error === null) {
                return resetIncomingPurchaseFields(uid);
            } else {
                disapatchAlertError(error);
            }
        }, added);
    };

    const submit = <Button mini label="Save" theme="highlight" icon="save" onClick={onSubmit} />;

    const startBar = (
        <>
            {addedExists && selectAll}
            {selectedExists && !allSelected && clear}
            {selectedExists && remove}
        </>
    );

    const endBar = <>{addedExists && submit}</>;

    return <NavbarContentTemplate start={startBar} end={endBar} />;
};

export default PurchaseNav;
