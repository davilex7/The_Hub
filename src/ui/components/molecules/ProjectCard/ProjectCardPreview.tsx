/**
 * ProjectCardPreview Sub-component
 * Displays the project preview image/gif
 */
import type { PreviewType } from '../../../../core/domain/types';
import styles from './ProjectCard.module.css';

interface ProjectCardPreviewProps {
  readonly src: string;
  readonly alt: string;
  readonly type: PreviewType;
}

export function ProjectCardPreview({
  src,
  alt,
  type,
}: ProjectCardPreviewProps): JSX.Element {
  // For video type, we could add a video element
  // For now, treat everything as images
  const isAnimated = type === 'gif' || type === 'video';

  return (
    <div className={styles.previewContainer}>
      <img
        src={src}
        alt={alt}
        className={styles.previewImage}
        loading="lazy"
        decoding="async"
        data-animated={isAnimated || undefined}
      />
      {isAnimated && <span className={styles.animatedBadge}>GIF</span>}
    </div>
  );
}
