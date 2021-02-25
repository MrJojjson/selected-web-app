import { useState, useEffect } from 'react';

type WindowSizeState = {
    width: number | undefined;
    height: number | undefined;
};

type UseWindowSizeReturn = {
    windowSize: WindowSizeState;
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
};

export const useWindowSize = (): UseWindowSizeReturn => {
    const [windowSize, setWindowSize] = useState<WindowSizeState>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };
            window.addEventListener('resize', handleResize);
            handleResize();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    const mobile = windowSize.width <= 768;
    const tablet = windowSize.width > 768 && windowSize.width <= 1080;
    const desktop = windowSize.width > 1080;
    return { windowSize, mobile, tablet, desktop };
};
