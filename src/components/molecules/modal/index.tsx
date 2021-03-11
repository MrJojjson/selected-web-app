import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Portal } from '../../../hooks/usePortal';
import { modalToggleOpen } from '../../../redux/actions/modalActions';
import { getModalContentTypeState, getModalOpenState } from '../../../redux/selectors/modalSelector';
import { ModalStateContentType } from '../../../redux/types/modalTypes';
import { Hamburger } from '../../atoms/hamburger';
import './modal.style.scss';

export type ModalType = {
    content: JSX.Element;
    id: 'modal_content';
    fromId: ModalStateContentType;
};

export const setModal = ({ content, id, fromId }: ModalType) => {
    const modalRoot = document.getElementById(id);
    if (!modalRoot) return null;
    const open = getModalOpenState();
    const contentType = getModalContentTypeState();
    if (fromId !== contentType) return null;
    if (!open) {
        return <Portal target={modalRoot}></Portal>;
    }
    modalRoot?.classList?.add('new');

    return <Portal target={modalRoot}>{content}</Portal>;
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

const ModalBase = () => {
    const open = getModalOpenState();
    const contentType = getModalContentTypeState();
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
            className={cn('modal', {
                active: open,
            })}
        >
            <Hamburger
                className={cn('header_close', {
                    header_close__hide: contentType === 'login',
                })}
                open={open}
                onClick={() => dispatch(modalToggleOpen({ override: false, contentType: 'undefined' }))}
            />
            <div id="modal_content" ref={modalContentRef} className="modal_content"></div>
        </div>
    );
};

export default ModalBase;
