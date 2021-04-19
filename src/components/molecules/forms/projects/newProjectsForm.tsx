import cn from 'classnames';
import { find, includes, map, propEq, without } from 'ramda';
import React, { Dispatch, useState } from 'react';
import { getCasksState, getSpiritsState } from '../../../../redux';
import { CasksDataType } from '../../../../redux/types/casksTypes';
import { SpiritsDataType } from '../../../../redux/types/spiritsTypes';
import { CaskKeyType } from '../../../../types/caskTypes';
import { InputVarsType } from '../../../../types/inputTypes';
import { SpiritKeyType } from '../../../../types/spiritsTypes';
import { Text } from '../../../atoms';
import { Selector } from '../../../atoms/selectors';
import './newProjectsForm.style.scss';

type TCheckedOptions = { spirits: string[]; casks: string[] };

const liText = (label: string) => <Text fontSize="l">{label}</Text>;

type TGetOptions = {
    data: SpiritsDataType[] | CasksDataType[];
    checkedOptions: TCheckedOptions;
    setCheckedOptions: Dispatch<React.SetStateAction<TCheckedOptions>>;
    types: SpiritKeyType[] | CaskKeyType[];
    type: keyof TCheckedOptions;
};

const getOptions = ({ data, checkedOptions, setCheckedOptions, types, type }: TGetOptions) =>
    map(({ title, uid, data }) => {
        const values = map((type) => {
            const { value } = find(propEq('id', type))(data) as InputVarsType;
            return value;
        }, types);
        const checkedType = checkedOptions[type];
        const alreadyChecked = includes(uid, checkedType);
        const setChecked = () => {
            const newType = alreadyChecked ? without([uid], checkedType) : [...checkedType, uid];
            setCheckedOptions({ ...checkedOptions, [type]: newType });
        };
        return (
            <li key={uid} className={cn({ active: alreadyChecked })} onClick={() => setChecked()}>
                <Selector checked={alreadyChecked} onChange={() => setChecked()} />
                {liText(title)}
                {liText([...values].join(' - '))}
            </li>
        );
    }, data);

export const NewProjectForm = () => {
    const [checkedOptions, setCheckedOptions] = useState<TCheckedOptions>({ spirits: [], casks: [] });
    const { data: spiritData } = getSpiritsState();
    const { data: caskData } = getCasksState();
    const spirits = getOptions({
        data: spiritData,
        checkedOptions,
        setCheckedOptions,
        types: ['distillery', 'recipe', 'originalVolume'],
        type: 'spirits',
    });
    const casks = getOptions({
        data: caskData,
        checkedOptions,
        setCheckedOptions,
        types: ['type', 'size', 'base'],
        type: 'casks',
    });
    console.log('spiritData', spiritData);

    const calc = map((uid) => find(propEq('uid', uid))(spiritData), checkedOptions?.spirits);
    console.log('calc', calc);

    return (
        <div className="new_projects_form">
            <ul>{spirits}</ul>
            <div
                className={cn('calculator', {
                    active: checkedOptions?.casks?.length || checkedOptions?.spirits?.length,
                })}
            >
                {/* {calc} */}
            </div>
            <ul>{casks}</ul>
        </div>
    );
};
