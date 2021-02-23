import React from 'react';
import { useProgressiveImg } from '../../../hooks/useProgressiveImg';
import styles from '../../../../styles/atoms/image.module.scss';
import NextImage from 'next/image';

export type ImageType = {
    src: string;
    lowResSrc: string;
    alt: string;
    aspectRatio?: 'thirty-nine' | 'twentyone-nine' | 'sixteen-nine' | 'three-two';
    className?: string;
    highlight?: number;
};

export const Image: React.FC<ImageType> = ({
    className = '',
    aspectRatio = 'twentyone-nine',
    src,
    lowResSrc,
    highlight = 50,
    ...rest
}) => {
    const { newSrc, blur } = useProgressiveImg({ lowQualitySrc: lowResSrc, highQualitySrc: src });

    return (
        <figure
            className={`${styles.image} ${blur ? styles.blur : styles.no_blur} ${styles.aspectRatio}  ${className}`}
        >
            <NextImage src={newSrc} layout="fill" objectFit="cover" {...rest} />
        </figure>
    );
};
