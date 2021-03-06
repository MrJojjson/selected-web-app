import cn from 'classnames';
import { addIndex, includes, map } from 'ramda';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { DateFormatted } from '../../../../common/utils/dateFormat';
import { BarLayout } from '../../../../layout/barLayout';
import { BarElement } from '../../../../layout/barLayout/bar';
import {
    FormsListInputListBarType,
    FormsListInputListContainerType,
    FormsListInputListItemDataType,
    FormsListInputListItemsType,
    FormsListInputListType,
} from '../../../../redux/types/formsTypes';
import { Header, Input, Text } from '../../../atoms';
import { Selector } from '../../../atoms/selectors';
import './inputList.style.scss';

export const InputList = ({
    data,
    overrideOpen,
    uid,
    edit,
    title,
    description,
    perElement,
    meta,
    start,
    ...rest
}: FormsListInputListType) => {
    const existsData = overrideOpen === undefined ? data?.length > 0 : overrideOpen;
    const barLayoutStart = (
        <InputListBar
            uid={uid}
            isSelected={uid ? includes(uid, rest.selected) : false}
            onChangeSelect={rest.onChangeSelect}
            edit={edit}
            meta={meta}
            description={description}
            title={title}
        />
    );

    return (
        <BarLayout start={perElement ? start : barLayoutStart} overrideOpen={existsData}>
            <InputListContainer
                data={data}
                edit={edit}
                meta={meta}
                description={description}
                perElement={perElement}
                {...rest}
            />
        </BarLayout>
    );
};

export const InputListContainer = ({
    data,
    onBlurInput,
    edit,
    perElement,
    selected,
    meta,
    description,
    onChangeSelect,
}: FormsListInputListContainerType) => {
    const container = map(({ data = [], uid }) => {
        let desc = description;

        if (includes('new-spirit', uid)) {
            desc = 'New spirit';
        }
        if (includes('new-cask', uid)) {
            desc = 'New cask';
        }
        if (includes('new-spirit-cask', uid)) {
            desc = 'New spirit and cask';
        }
        const heading = (
            <InputListBar
                uid={uid}
                isSelected={uid ? includes(uid, selected) : false}
                onChangeSelect={onChangeSelect}
                edit={edit}
                meta={meta || DateFormatted({})}
                description={desc}
            />
        );
        return (
            <li key={uid}>
                {perElement && <BarElement start={heading} />}
                <InputListItems edit={edit} data={data} uid={uid} onBlurInput={onBlurInput} />
            </li>
        );
    }, data);
    return <>{container}</>;
};

export const InputListBar = ({
    uid,
    isSelected,
    onChangeSelect,
    edit,
    description,
    title,
    meta,
}: FormsListInputListBarType) => {
    const dispatch = useDispatch();

    const displaySelector = edit === undefined ? true : edit;
    return (
        <>
            {displaySelector && (
                <Selector
                    className={cn('input_list_selector', {
                        hide: edit === undefined ? false : !edit,
                    })}
                    checked={isSelected}
                    onChange={() => dispatch(onChangeSelect({ uid }))}
                />
            )}
            {title && <Header>{title}</Header>}
            <Text fontSize="l">{description}</Text>
            <Text fontSize="l">{meta}</Text>
        </>
    );
};

type OnBlurInputType = {
    event: React.ChangeEvent<EventTarget & HTMLInputElement>;
    id: string;
};

export const InputListItems = ({ data = [], uid, onBlurInput, edit }: FormsListInputListItemsType) => {
    const dispatch = useDispatch();
    const onBlur = ({ event, id }: OnBlurInputType) => {
        const { value } = event?.currentTarget;
        dispatch(onBlurInput({ uid, id, value }));
    };

    return (
        <ul className="input_list_container">
            {addIndex(map)(
                ({ id, title, type, value, focus, belonging, disabled }: FormsListInputListItemDataType, index) => {
                    const lineBreak = belonging !== data[index - 1]?.belonging;

                    const returnLineBreak = lineBreak ? (
                        <li className="line_break">
                            <Text fontSize="m">{belonging}</Text>
                        </li>
                    ) : null;

                    const { value: fValue, newValue: fNewValue, initiator: fInitiator } = focus || {};
                    const focusValue = fInitiator === 'undo' ? fValue : fNewValue;
                    let inputDisabled = disabled || false;

                    if (disabled === undefined && edit !== undefined) {
                        inputDisabled = !edit;
                    }

                    return (
                        <Fragment key={`${uid}-${id}`}>
                            {returnLineBreak}
                            <li>
                                <Input
                                    label={title}
                                    placeholder={title}
                                    value={value}
                                    name={id?.toString()}
                                    type={type}
                                    onBlur={(event) =>
                                        event.currentTarget.value !== value && onBlur({ event, id: id?.toString() })
                                    }
                                    disabled={inputDisabled}
                                    focusValue={focusValue}
                                />
                            </li>
                        </Fragment>
                    );
                },
                data,
            )}
        </ul>
    );
};
