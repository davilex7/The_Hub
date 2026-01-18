/**
 * ProjectCard Molecule Component
 * Displays a project as a draggable card
 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef, useRef, type HTMLAttributes } from 'react';

import type { Project } from '../../../../core/domain/entities';
import styles from './ProjectCard.module.css';
import { ProjectCardContent } from './ProjectCardContent';
import { ProjectCardPreview } from './ProjectCardPreview';

interface ProjectCardProps extends Omit<HTMLAttributes<HTMLElement>, 'id'> {
  readonly project: Project;
  readonly isDraggingDisabled?: boolean;
}

// Minimum distance in pixels to consider it a drag, not a click
const DRAG_THRESHOLD = 5;

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

    // Track pointer start position to detect drag vs click
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

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

    const handlePointerDown = (e: React.PointerEvent<HTMLElement>): void => {
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
      // Call the original listener from dnd-kit
      listeners?.onPointerDown?.(e as unknown as React.PointerEvent<Element>);
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
      // Always prevent if currently dragging
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Check if pointer moved beyond threshold (was a drag)
      if (pointerStartRef.current) {
        const deltaX = Math.abs(e.clientX - pointerStartRef.current.x);
        const deltaY = Math.abs(e.clientY - pointerStartRef.current.y);

        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
          e.preventDefault();
          e.stopPropagation();
        }
      }

      // Reset for next interaction
      pointerStartRef.current = null;
    };

    // Merge our pointer handler with dnd-kit listeners
    const mergedListeners = {
      ...listeners,
      onPointerDown: handlePointerDown,
    };

    return (
      <article
        ref={handleRef}
        style={style}
        className={classNames}
        data-dragging={isDragging || undefined}
        {...attributes}
        {...mergedListeners}
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
