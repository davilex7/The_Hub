/**
 * Image Atom Component
 * Responsive image with lazy loading and aspect ratio support
 */
import type { ImgHTMLAttributes } from 'react';

import styles from './Image.module.css';

type AspectRatio = 'auto' | '1:1' | '4:3' | '16:9' | '21:9';
type ObjectFit = 'cover' | 'contain' | 'fill' | 'none';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly src: string;
  readonly alt: string;
  readonly aspectRatio?: AspectRatio;
  readonly objectFit?: ObjectFit;
  readonly rounded?: boolean;
}

export function Image({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
  rounded = false,
  className,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: ImageProps): JSX.Element {
  const aspectRatioClass =
    aspectRatio !== 'auto' ? styles[`aspect${aspectRatio.replace(':', 'x')}`] : '';
  const objectFitClass = styles[`fit${objectFit.charAt(0).toUpperCase()}${objectFit.slice(1)}`];

  const classNames = [
    styles.image,
    aspectRatioClass,
    objectFitClass,
    rounded ? styles.rounded : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      src={src}
      alt={alt}
      className={classNames}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
