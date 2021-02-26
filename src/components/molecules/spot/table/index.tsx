import { map, repeat } from 'ramda';
import React from 'react';
import { Text } from '../../../atoms';
import './tableSpot.style.scss';

type TableSpotType = {
    headings: string[];
};

const returnHeadings = (headings: TableSpotType['headings']) =>
    map(
        (heading) => (
            <Text tag="span" key={heading}>
                {heading}
            </Text>
        ),
        headings,
    );

export const TableSpot = ({ headings }: TableSpotType) => {
    console.log('headings', headings);

    return (
        <div className="table_spot">
            <div className="table_headings" style={{ gridTemplateColumns: `repeat(${headings.length}, auto)` }}>
                {returnHeadings(headings)}
            </div>
            <div className="table_content" style={{ gridTemplateColumns: `repeat(${headings.length}, auto)` }}>
                {returnHeadings(headings)}
            </div>
        </div>
    );
};
