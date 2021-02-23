import React from 'react';
import { createPortal } from 'react-dom';

export type PortalType = {
    target: Element;
    children?: React.ReactNode;
};
export const Portal = ({ children, target }: PortalType) => createPortal(children, target);
