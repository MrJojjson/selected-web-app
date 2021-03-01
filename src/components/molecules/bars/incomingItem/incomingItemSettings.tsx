import React from 'react';
import { Bar } from '../../../../layout/barLayout/bar';
import { Button, Dropdown } from '../../../atoms';

type IncomingItemSettingsType = {};

export const IncomingItemSettings = ({}: IncomingItemSettingsType) => {
    return (
        <Bar
            left={
                <>
                    <Dropdown
                        id="incoming_item_sort"
                        label="Sort by"
                        options={[
                            { label: 'Test 1', value: 'test1' },
                            { label: 'Test 2', value: 'test2' },
                        ]}
                        onOptionChange={() => console.log('Click option')}
                    />
                    <Dropdown
                        id="incoming_item_sort"
                        label="Filter by"
                        options={[
                            { label: 'Test 1', value: 'test1' },
                            { label: 'Test 2', value: 'test2' },
                        ]}
                        onOptionChange={() => console.log('Click option')}
                    />
                </>
            }
        />
    );
};
