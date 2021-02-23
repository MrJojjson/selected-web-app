import document from 'global/document';
import { useCallback, useEffect, useState } from 'react';
import styles from '../../styles/molecules/alert.module.scss';
import { Alert } from '../components/molecules/alert';
import { ModalType } from '../components/molecules/modal';

type UseAlertType = {
    timeout?: number;
};

type AlertReturnType = {
    setActive: (active: boolean) => void;
    onToggleAlert: () => void;
    alert: JSX.Element;
};

const getAlertRoot = () => process.browser && document.getElementById('alert');
const getAlertRootState = (alertRoot) => process.browser && alertRoot.classList.contains(styles.active);

export const useAlert = ({ content, timeout }: UseAlertType & Pick<ModalType, 'content'>): AlertReturnType => {
    const [active, setActive] = useState<boolean>(false);

    const onToggleAlert = useCallback(() => {
        let timer: NodeJS.Timeout;
        const alertRoot = getAlertRoot();
        const alertState = getAlertRootState(getAlertRoot());

        if (process.browser) {
            alertState ? alertRoot.classList.remove(styles.active) : alertRoot.classList.add(styles.active);
            setActive(alertState);
        }
        if (timeout > 0 && alertRoot.classList.contains(styles.active)) {
            const timer = setTimeout(() => {
                alertRoot.classList.remove(styles.active);
                setActive(false);
            }, timeout);
        }
        return () => clearTimeout(timer);
    }, [active]);

    const alert = <Alert content={content} />;

    return { setActive, onToggleAlert, alert };
};
