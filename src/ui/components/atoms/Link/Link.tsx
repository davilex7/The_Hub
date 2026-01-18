/**
 * Link Atom Component
 * Accessible link with external link handling
 */
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { Icon } from '../Icon';
import styles from './Link.module.css';

type LinkVariant = 'default' | 'subtle' | 'button';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string;
  readonly variant?: LinkVariant;
  readonly external?: boolean;
  readonly showExternalIcon?: boolean;
  readonly children: ReactNode;
}

export function Link({
  href,
  variant = 'default',
  external = false,
  showExternalIcon = true,
  className,
  children,
  ...props
}: LinkProps): JSX.Element {
  const isExternal = external || href.startsWith('http');
  const externalProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  const classNames = [styles.link, styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <a href={href} className={classNames} {...externalProps} {...props}>
      {children}
      {isExternal && showExternalIcon && (
        <Icon name="externalLink" size="sm" className={styles.externalIcon} />
      )}
    </a>
  );
}
