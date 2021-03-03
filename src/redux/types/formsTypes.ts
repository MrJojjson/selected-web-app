import { BarLayoutType } from '../../layout/barLayout';
import { WhiskyVarsType } from '../../types/whiskyTypes';

export type FormsListWhiskyListType = FormsListWhiskyListContainerType & BarLayoutType;

export type FormsListWhiskyListContainerType = Pick<
    FormsListWhiskyListBarType,
    'onChangeSelect' | 'onChangeWorkingTitle' | 'edit'
> &
    Pick<FormsListWhiskyListItemsType, 'onBlurInput'> & {
        data: FormsListWhiskyListItemsType[];
        selected: string[];
        uid?: string;
    };

type FormsListWhiskyOnBlurType = {
    uid: string;
    id: string;
    value: string;
};

export type FormsListWhiskyListItemsType = {
    data: WhiskyVarsType[];
    uid: string;
    onBlurInput?: ({ ...rest }: FormsListWhiskyOnBlurType) => void;
};

type FormsListWhiskyListBarOnChangeType = {
    uid: string;
};

type FormsListWhiskyListBaronChangeWorkingTitleType = {
    event: React.ChangeEvent<EventTarget & HTMLInputElement>;
};

export type FormsListWhiskyListBarType = {
    uid: string;
    isSelected: boolean;
    onChangeSelect: ({ uid }: FormsListWhiskyListBarOnChangeType) => void;
    onChangeWorkingTitle: ({ event }: FormsListWhiskyListBaronChangeWorkingTitleType) => void;
    edit?: boolean;
};
