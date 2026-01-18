/**
 * Text Atom Component
 * Semantic text component with consistent typography
 */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import styles from './Text.module.css';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

type TextColor = 'primary' | 'secondary' | 'muted' | 'inherit';

interface TextProps extends HTMLAttributes<HTMLElement> {
  readonly as?: ElementType;
  readonly variant?: TextVariant;
  readonly color?: TextColor;
  readonly truncate?: boolean;
  readonly children: ReactNode;
}

const defaultElements: Record<TextVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'span',
};

export function Text({
  as,
  variant = 'body',
  color = 'primary',
  truncate = false,
  className,
  children,
  ...props
}: TextProps): JSX.Element {
  const Component = as ?? defaultElements[variant];
  const classNames = [
    styles.text,
    styles[variant],
    styles[color],
    truncate ? styles.truncate : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}
