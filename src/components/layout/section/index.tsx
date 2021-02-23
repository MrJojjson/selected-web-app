import React from 'react';
import styles from '../../../../styles/layout/section.module.scss';
import cn from 'classnames';
import { SectionType } from '../../../types/sectionTypes';

export const Section = ({ className, children, fullWidth, id }: SectionType) => {
    return (
        <section
            id={id}
            className={cn(styles.section, className, {
                [styles.full_width]: fullWidth,
            })}
        >
            {children}
        </section>
    );
};
