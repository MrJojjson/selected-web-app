import React from 'react';
import { NewProjectForm } from '../components/molecules/forms/projects/newProjectsForm';
import { PageLayout } from '../layout/pageLayout';

const Projects = () => {
    return (
        <PageLayout disableLayout>
            <NewProjectForm key="projects-new-projects-form" />
        </PageLayout>
    );
};

export default Projects;
