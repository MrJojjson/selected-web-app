import React from 'react';
import { useProgressiveImg } from '../../../hooks/useProgressiveImg';
import './image.style.scss';
import cn from 'classnames';

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
        <figure className={cn('image', [aspectRatio], className)}>
            <img
                src={newSrc}
                style={{ top: `${highlight}%`, transform: `translateY(-${highlight}%)` }}
                className={cn([highlight], {
                    blur: blur,
                })}
                {...rest}
            />
        </figure>
    );
};
