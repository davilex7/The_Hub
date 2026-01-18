/**
 * Tag Atom Component
 * Small label for categories and technologies
 */
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Tag.module.css';

type TagVariant = 'default' | 'primary' | 'secondary';
type TagSize = 'sm' | 'md';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  readonly variant?: TagVariant;
  readonly size?: TagSize;
  readonly children: ReactNode;
}

export function Tag({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: TagProps): JSX.Element {
  const classNames = [styles.tag, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}
