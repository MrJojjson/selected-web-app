import cn from 'classnames';
import React from 'react';
import { Header, Text } from '../../components/atoms';
import './barLayout.style.scss';

export type BarHeadingType = {
    title?: string;
    barBtn?: JSX.Element;
    description?: string;
    meta?: string;
    className?: string;
};

export const BarHeading = ({ title, barBtn, description, meta, className }: BarHeadingType) => {
    return (
        <div className={cn('bar_heading', className)}>
            <div className="left">
                <div className="bar_heading_heading">
                    <Header className="bar_heading_header" tag="h3" fontSize="s">
                        {title}
                    </Header>
                    {description && <Text className="bar_heading_description">{description}</Text>}
                    {meta && <Text className="bar_heading_meta">{meta}</Text>}
                </div>
            </div>
            <div className="right">{barBtn}</div>
        </div>
    );
};

export type BarElementType = {
    start?: JSX.Element;
    end: JSX.Element;
    className?: string;
};

export const BarElement = ({ start, end, className }: BarElementType) => {
    const renderStart = start && <div className="start">{start}</div>;
    const renderEnd = end && <div className="end">{end}</div>;
    return (
        <div className={cn('bar_element', className)}>
            {renderStart}
            {renderEnd}
        </div>
    );
};
