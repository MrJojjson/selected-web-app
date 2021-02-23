import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { toTypes } from '../types';

export type OnUsePushType = {
    to: toTypes;
};
export const useRouterPush = () => {
    const router = useRouter();
    const onUsePush = ({ to }: OnUsePushType) => router.push(to);
    return { onUsePush };
};
