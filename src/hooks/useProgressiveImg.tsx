import { useState, useEffect } from 'react';

interface IUseProgressiveImg {
    lowQualitySrc: string;
    highQualitySrc: string;
}

export const useProgressiveImg = ({
    lowQualitySrc,
    highQualitySrc,
}: IUseProgressiveImg): { newSrc: string; blur: boolean } => {
    const [newSrc, setSrc] = useState(lowQualitySrc);

    useEffect(() => {
        setSrc(lowQualitySrc);

        const img = new Image();
        img.src = highQualitySrc;

        img.onload = () => {
            setSrc(highQualitySrc);
        };
        return () => (img.onload = null);
    }, [lowQualitySrc, highQualitySrc]);

    const blur = newSrc === lowQualitySrc;
    return { newSrc, blur };
};
