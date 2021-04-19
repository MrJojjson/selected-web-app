import React from 'react';
import { useDispatch } from 'react-redux';
import { BarElement } from '../../../../layout/barLayout/bar';
import { purchaseIncomingSelected } from '../../../../redux';
import { Button } from '../../../atoms';

const ProjectsNav = () => {
    const dispatch = useDispatch();

    const newProject = (
        <Button
            mini
            label="New project"
            theme="highlight"
            icon="times"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    const rerack = (
        <Button
            mini
            label="Rerack"
            theme="secondary"
            icon="trash"
            onClick={() => dispatch(purchaseIncomingSelected({ remove: true }))}
        />
    );

    return <BarElement start={rerack} end={newProject} />;
};

export default ProjectsNav;
