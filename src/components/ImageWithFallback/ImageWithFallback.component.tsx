import type {ImageWithFallbackProps} from './ImageWithFallback.type';

import './ImageWithFallback.scss';

import React from 'react';

const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  const {src, fallback, type = 'image/webp', ...delegated} = props;

  return (
    <picture className="cj-image-with-fallback">
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
