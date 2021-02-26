import React from 'react';
import { Text } from '../components/atoms';
import { CompLayout } from '../layout/compLayout';

export const Dashboard = () => {
    return (
        <>
            <CompLayout>
                <Text>Dashboard 1</Text>
            </CompLayout>
            <CompLayout>
                <Text>Dashboard 2</Text>
            </CompLayout>
            <CompLayout>
                <Text>Dashboard 3</Text>
            </CompLayout>
        </>
    );
};
