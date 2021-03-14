import { BarLayoutType } from '../../layout/barLayout';
import { BarHeadingType } from '../../layout/barLayout/bar';
import { InputVarsType } from '../../types/inputTypes';

export type FormsListInputListType = FormsListInputListContainerType & BarLayoutType;

export type FormsListInputListContainerType = Pick<
    FormsListInputListBarType,
    'onChangeSelect' | 'edit' | 'perElement' | 'description' | 'meta'
> &
    Pick<FormsListInputListItemsType, 'onBlurInput'> & {
        data: FormsListInputListItemsType[];
        selected: string[];
        uid?: string;
    };

export type FormsListSpiritOnBlurType = {
    uid: string;
    id: string;
    value: string;
};

export type FormsListInputListItemDataType = InputVarsType;

export type FormsListInputListItemsType = {
    data: FormsListInputListItemDataType[];
    uid: string;
    edit?: boolean;
    onBlurInput?: (props: FormsListSpiritOnBlurType) => void;
};

type FormsListInputListBarOnChangeType = {
    uid: string;
};

export type FormsListInputListBarType = BarHeadingType & {
    uid: string;
    isSelected: boolean;
    onChangeSelect: (props: FormsListInputListBarOnChangeType) => void;
    edit?: boolean;
    perElement?: boolean;
};
