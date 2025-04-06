// src/components/common/ImageWithFallback.js
import { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
