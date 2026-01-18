/**
 * TechnologyBadge Molecule Component
 * Displays a technology tag with optional icon
 */
import type { HTMLAttributes } from 'react';

import { Tag } from '../../atoms';
import styles from './TechnologyBadge.module.css';

interface TechnologyBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  readonly name: string;
}

export function TechnologyBadge({
  name,
  className,
  ...props
}: TechnologyBadgeProps): JSX.Element {
  const classNames = [styles.badge, className].filter(Boolean).join(' ');

  return (
    <Tag variant="default" size="sm" className={classNames} {...props}>
      {name}
    </Tag>
  );
}
