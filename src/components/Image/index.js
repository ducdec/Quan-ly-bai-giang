import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

function Image(
  { src, alt, className, fallback: customFallback = images.NoImage, ...props },
  ref,
) {
  const [fallback, setFallback] = useState('');
  const handlleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handlleError}
    />
  );
}

export default forwardRef(Image);
