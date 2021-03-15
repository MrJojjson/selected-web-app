import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getSystemAlertState } from '../../../redux/selectors/systemSelector';
import { Text } from '../../atoms';
import './alert.style.scss';

export type AlertType = {
    content: JSX.Element;
    id: 'alert_content';
};

export const setAlert = ({ content, id }: AlertType) => {
    const alertRoot = document.getElementById(id);
    alertRoot?.classList?.add('new');
    return createPortal(content, alertRoot);
};

export const AlertBase = () => {
    const { open, contentLog } = getSystemAlertState() || {};
    const alertContentRef = useRef<any | null>(null);

    const [log, setLog] = useState<JSX.Element[]>([]);
    const [lastItemIndex, setLastItemIndex] = useState<number>(0);

    useEffect(() => {
        let timer: any;
        const { id, value, type } = contentLog[lastItemIndex] || {};
        const newLogitem = (
            <li
                key={id}
                className={cn('alert_log', type, {
                    active: open,
                })}
            >
                <Text fontSize="m" theme="secondary">
                    {value}
                </Text>
            </li>
        );

        timer = setInterval(() => {
            setLastItemIndex(lastItemIndex + 1);
            setLog((log) => [...log, newLogitem]);
        }, 0);

        if (lastItemIndex >= contentLog?.length) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [contentLog, lastItemIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (alertContentRef.current?.firstChild === null) {
                clearInterval(timer);
            }
            if (log.length > 0) {
                alertContentRef.current?.firstChild?.classList?.add('fade_out');
                setTimeout(() => {
                    alertContentRef.current?.firstChild?.remove();
                }, 250);
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [log]);

    return (
        <div id="alert" className="alert">
            <ul id="alert_content" ref={alertContentRef} className="alert_content">
                {[...log]}
            </ul>
        </div>
    );
};
