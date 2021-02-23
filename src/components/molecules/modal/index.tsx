import cn from 'classnames';
import document from 'global/document';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../../styles/molecules/modal.module.scss';
import { Portal } from '../../../hooks/usePortal';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { modalToggleOpen } from '../../../redux/actions/modalActions';
import { getAuthLoggedInState } from '../../../redux/selectors/authSelectors';
import { getModalContentTypeState, getModalOpenState } from '../../../redux/selectors/modalSelector';
import { ModalStateContentType } from '../../../redux/types/modalTypes';
import { Hamburger } from '../../atoms/hamburger';

const MODAL_ID = 'modal_content';

export type ModalType = {
    content: JSX.Element;
    id: 'modal_content';
    fromId: ModalStateContentType;
};

export const setModal = ({ content, id, fromId }: ModalType) => {
    const open = getModalOpenState();
    const contentType = getModalContentTypeState();
    if (fromId !== contentType) return null;
    if (process.browser) {
        const modalRoot = document.getElementById(id);
        if (!open) {
            return <Portal target={modalRoot}></Portal>;
        }
        modalRoot.classList.add('new');

        return <Portal target={modalRoot}>{content}</Portal>;
    }
};

const setModalFocus = (inputs: HTMLInputElement[]) => {
    if (inputs && inputs.length) {
        for (let index = 0; index < inputs.length; index += 1) {
            const element = inputs[index];
            const val = element.getAttribute('value');
            if (!val) {
                element.focus();
                break;
            } else if (index === inputs.length - 1) {
                inputs[0].focus();
            }
        }
    }
};

export const ModalBase = () => {
    const open = getModalOpenState();
    const loggedIn = getAuthLoggedInState();
    const contentType = getModalContentTypeState();
    const { mobile } = useWindowSize();
    const dispatch = useDispatch();
    const modalContentRef = useRef<any | null>(null);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (modalContentRef && modalContentRef.current) {
            const inputsInModal = modalContentRef.current?.firstChild?.getElementsByTagName(
                'input',
            ) as HTMLInputElement[];
            setModalFocus(inputsInModal);
            const { width } = modalContentRef.current?.firstChild?.getBoundingClientRect() || {};
            typeof width === 'number' && setWidth(width);
        }
    }, [contentType]);

    return (
        <div
            id="modal"
            style={{ width: `${width + 80}px` }}
            className={cn(styles.modal, {
                [styles.active]: open,
            })}
        >
            <Hamburger
                className={cn(styles.header_close, {
                    [styles.header_close__hide]: contentType === 'menu',
                })}
                open={open}
                onClick={() =>
                    process.browser && dispatch(modalToggleOpen({ override: false, contentType: 'undefined' }))
                }
            />
            <div id={MODAL_ID} ref={modalContentRef} className={styles.modal_content}></div>
        </div>
    );
};
