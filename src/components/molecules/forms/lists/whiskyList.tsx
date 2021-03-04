import { includes, map } from 'ramda';
import React from 'react';
import { useDispatch } from 'react-redux';
import { BarLayout } from '../../../../layout/barLayout';
import {
    FormsListWhiskyListBarType,
    FormsListWhiskyListContainerType,
    FormsListWhiskyListItemsType,
    FormsListWhiskyListType,
} from '../../../../redux/types/formsTypes';
import { Input, Text } from '../../../atoms';
import { Selector } from '../../../atoms/selectors';
import './whiskyList.style.scss';

export const WhiskyList = ({ data, overrideOpen, uid, edit, description, meta, ...rest }: FormsListWhiskyListType) => {
    const existsData = overrideOpen === undefined ? data?.length > 0 : overrideOpen;
    const barLayoutStart = (
        <>
            <WhiskyListBar
                uid={uid}
                isSelected={uid ? includes(uid, rest.selected) : false}
                onChangeSelect={rest.onChangeSelect}
                onChangeWorkingTitle={rest.onChangeWorkingTitle}
                edit={edit}
            />
            <Text>{description}</Text>
            <Text>{meta}</Text>
        </>
    );
    return (
        <BarLayout start={barLayoutStart} overrideOpen={existsData}>
            <ul className="whisky_list_form">
                <WhiskyListContainer data={data} edit={edit} {...rest} />
            </ul>
        </BarLayout>
    );
};

export const WhiskyListContainer = ({ data, onBlurInput, edit }: FormsListWhiskyListContainerType) => {
    const container = map(({ data = [], uid }) => {
        return (
            <li key={uid} className="whisky_list_container">
                <ul className="whisky_list_container_list">
                    <WhiskyListItems edit={edit} data={data} uid={uid} onBlurInput={onBlurInput} />
                </ul>
            </li>
        );
    }, data);
    return <>{container}</>;
};

export const WhiskyListBar = ({
    uid,
    isSelected,
    onChangeSelect,
    onChangeWorkingTitle,
    edit,
}: FormsListWhiskyListBarType) => {
    const dispatch = useDispatch();
    return (
        <>
            {edit && (
                <Selector
                    className="whisky_list_selector"
                    checked={isSelected}
                    onChange={() => dispatch(onChangeSelect({ uid }))}
                />
            )}
            <Input
                label="Name"
                placeholder="Name"
                defaultValue="The cask of all dreams"
                name="name"
                type="text"
                onBlur={(event) => onChangeWorkingTitle({ event })}
                disabled={edit === undefined ? false : !edit}
            />
        </>
    );
};

type OnBlurInputType = {
    event: React.ChangeEvent<EventTarget & HTMLInputElement>;
    id: string;
};

export const WhiskyListItems = ({ data = [], uid, onBlurInput, edit }: FormsListWhiskyListItemsType) => {
    const dispatch = useDispatch();
    const onBlur = ({ event, id }: OnBlurInputType) => {
        const { value } = event?.currentTarget;
        dispatch(onBlurInput({ uid, id, value }));
    };
    return (
        <>
            {map(
                ({ id, title, type, value }) => (
                    <li key={`${uid}-${id}`}>
                        <Input
                            label={title}
                            placeholder={title}
                            defaultValue={value}
                            name={id}
                            type={type}
                            onBlur={(event) => onBlur({ event, id })}
                            disabled={edit === undefined ? false : !edit}
                        />
                    </li>
                ),
                data,
            )}
        </>
    );
};
