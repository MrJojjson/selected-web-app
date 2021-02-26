import React from 'react';
import { Input } from '../../../atoms';

export const CaskAndLiquourTemplate = () => {
    return (
        <>
            <CaskTemplate />
            <LiquourTemplate />
        </>
    );
};

export const CaskTemplate = () => {
    return (
        <>
            <Input label="Cask #" placeholder="Cask #" id="casknumber" type="text" />
            <Input label="Volume" placeholder="Volume" id="caskvolume" type="text" />
            <Input label="Material" placeholder="Material" id="caskmaterial" type="text" />
            <Input label="Prior liqour" placeholder="Prior liqour" id="caskpriorliqour" type="text" />
        </>
    );
};

export const LiquourTemplate = () => {
    return (
        <>
            <Input label="Liqour #" placeholder="Liqour #" id="liqournumber" type="text" />
            <Input label="Volume" placeholder="Volume" id="liqourvolume" type="text" />
            <Input label="Strength" placeholder="Strength" id="liqourstrength" type="number" />
            <Input label="PPM" placeholder="PPM" id="liqourppm" type="number" />
        </>
    );
};
