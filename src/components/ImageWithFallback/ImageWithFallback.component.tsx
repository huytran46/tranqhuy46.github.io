import type {ImageWithFallbackProps} from './ImageWithFallback.type';

import React from 'react';

const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  const {src, fallback, type = 'image/webp', ...delegated} = props;

  return (
    <picture>
      <source srcSet={src} type={type} />
      <img src={fallback} {...delegated} />
    </picture>
  );
};

export default ImageWithFallback;
