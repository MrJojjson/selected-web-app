import React, { useState } from 'react';
import { Text } from '../text';
import './slider.style.scss';

type SliderType = {
    min: number;
    max: number;
    onMouseUpCapture: (value: string) => void;
    defaultMaxValue?: number;
    defaultMinValue?: number;
};

export const Slider = ({ min, max, onMouseUpCapture, defaultMaxValue, defaultMinValue }: SliderType) => {
    const [minValue, setMinValue] = useState<number>(defaultMinValue);
    const [maxValue, setMaxValue] = useState<number>(defaultMaxValue);

    const onChangeMinValue = (value: number) => setMinValue(value >= maxValue ? maxValue : value);

    const onChangeMaxValue = (value: number) => setMaxValue(value <= minValue ? minValue : value);
    const minPerc = (minValue / max) * 95;
    const maxPerc = (maxValue / max) * 95;

    return (
        <div className="slider">
            <div className="slider_min_value" style={{ paddingLeft: `${minPerc}%` }}>
                <Text className="slider_value">{minValue}</Text>
            </div>
            <div className="slider-inputs">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onMouseUpCapture={({ currentTarget }) => onMouseUpCapture(currentTarget.value)}
                    onChange={({ currentTarget }) => onChangeMinValue(Number(currentTarget?.value))}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxValue}
                    onMouseUpCapture={({ currentTarget }) => onMouseUpCapture(currentTarget.value)}
                    onChange={({ currentTarget }) => onChangeMaxValue(Number(currentTarget?.value))}
                />
            </div>
            <div className="slider_max_value" style={{ paddingLeft: `${maxPerc}%` }}>
                <Text className="slider_value">{maxValue}</Text>
            </div>
        </div>
    );
};
