import React from 'react';
import { Header, Text } from '../../atoms';
import './bars.style.scss';

export type BarsHeadingType = {
    title: string;
    description?: string;
    meta?: string;
};

export const BarsHeading = ({ title, description, meta }: BarsHeadingType) => {
    return (
        <div className="bars_item_heading">
            <Header className="bars_item_header" tag="h3" fontSize="s">
                {title}
            </Header>
            {description && <Text className="bars_item_description">{description}</Text>}
            {meta && <Text className="bars_item_meta">{meta}</Text>}
        </div>
    );
};
