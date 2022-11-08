import type {ImageWithFallbackProps} from './ImageWithFallback.type';

import './ImageWithFallback.scss';

import clsx from 'clsx';
import React from 'react';

const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  const {src, fallback, type = 'image/webp', className, ...delegated} = props;

  return (
    <picture className={clsx('cj-image-with-fallback', className)}>
      <source
        className="cj-image-with-fallback__source"
        srcSet={src}
        type={type}
      />
      <img
        className="cj-image-with-fallback__img"
        src={fallback}
        {...delegated}
      />
    </picture>
  );
};

export default ImageWithFallback;
