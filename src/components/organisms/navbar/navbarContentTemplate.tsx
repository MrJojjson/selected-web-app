import cn from 'classnames';
import React from 'react';
import './navbar.style.scss';

type NavbarContentTemplateType = {
    start?: JSX.Element;
    end?: JSX.Element;
    className?: string;
};

export const NavbarContentTemplate = ({ start, end, className }: NavbarContentTemplateType) => {
    const renderStart = start && <div className="start">{start}</div>;
    const renderEnd = end && <div className="end">{end}</div>;
    return (
        <div className={cn('navbar_content_template', className)}>
            {renderStart}
            {renderEnd}
        </div>
    );
};
