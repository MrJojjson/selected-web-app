import cn from 'classnames';
import React, { useRef } from 'react';
import { Portal } from '../../../hooks/usePortal';
import { getAlertOpenState } from '../../../redux/selectors/alertSelector';
import './alert.style.scss';

export type AlertType = {
    content: JSX.Element;
    id: 'alert_content';
};

export const setAlert = ({ content, id }: AlertType) => {
    const open = getAlertOpenState();
    const alertRoot = document.getElementById(id);
    return <Portal target={alertRoot}>{content}</Portal>;
};

export const AlertBase = () => {
    const open = getAlertOpenState();
    const alertContentRef = useRef<any | null>(null);

    return (
        <div
            id="alert"
            className={cn('alert', {
                active: open,
            })}
        >
            <div id="alert_content" ref={alertContentRef} className="alert_content"></div>
        </div>
    );
};
