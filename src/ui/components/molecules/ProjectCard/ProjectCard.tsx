/**
 * ProjectCard Molecule Component
 * Displays a project as a draggable card
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef, useEffect, useRef, type HTMLAttributes } from 'react';

import type { Project } from '../../../../core/domain/entities';
import styles from './ProjectCard.module.css';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardPreview } from './ProjectCardPreview';

interface ProjectCardProps extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
  readonly project: Project;
  readonly isDraggingDisabled?: boolean;
}

export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  function ProjectCard({ project, isDraggingDisabled = false, className, ...props }, ref) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: project.id.toString(),
      disabled: isDraggingDisabled,
    });

    // Track if a drag just ended to prevent click navigation
    const wasDraggingRef = useRef(false);

    useEffect(() => {
      if (isDragging) {
        wasDraggingRef.current = true;
      } else if (wasDraggingRef.current) {
        // Reset after a short delay to allow click event to check it
        const timeoutId = setTimeout(() => {
          wasDraggingRef.current = false;
        }, 100);
        return () => clearTimeout(timeoutId);
      }
      return undefined;
    }, [isDragging]);

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const classNames = [
      styles.card,
      isDragging ? styles.dragging : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Merge refs for forwardRef and useSortable
    const handleRef = (element: HTMLElement | null): void => {
      setNodeRef(element);
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
      // Prevent navigation if we just finished dragging
      if (wasDraggingRef.current || isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    return (
      <article
        ref={handleRef}
        style={style}
        className={classNames}
        data-dragging={isDragging || undefined}
        {...attributes}
        {...listeners}
        {...props}
      >
        <a
          href={project.repositoryUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={`View ${project.name} repository on GitHub`}
          onClick={handleClick}
        >
          <ProjectCardPreview
            src={project.previewImage.toString()}
            alt={`Preview of ${project.name}`}
            type={project.previewType}
          />
          <ProjectCardContent project={project} />
        </a>
      </article>
    );
  }
);
