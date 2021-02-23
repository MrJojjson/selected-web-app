import { ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '../../../../styles/molecules/alert.module.scss';
import { Button } from '../../atoms';

const ID = 'alert';

export type AlertType = {
    content: JSX.Element;
};

export const Alert = ({ content }: AlertType) => {
    const [alert, setAlert] = useState<ReactPortal>(null);

    useEffect(() => {
        if (process.browser) {
            const alertRoot = document.getElementById(ID);
            alertRoot && setAlert(createPortal(content, alertRoot));
        }
    }, [process.browser, content]);

    return alert;
};

export const AlertBase = () => {
    return (
        <div id={ID} className={styles.alert}>
            <Button
                label="Close"
                onClick={() => process.browser && document.getElementById(ID).classList.remove(styles.active)}
                className={styles.header}
            />
        </div>
    );
};
