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
    // Track if we're in a drag operation
    const hasDraggedRef = useRef(false);

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
      hasDraggedRef.current = false;
      // Call the original listener from dnd-kit
      listeners?.onPointerDown?.(e as unknown as React.PointerEvent<Element>);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>): void => {
      // Check if we've moved beyond threshold
      if (pointerStartRef.current && !hasDraggedRef.current) {
        const deltaX = Math.abs(e.clientX - pointerStartRef.current.x);
        const deltaY = Math.abs(e.clientY - pointerStartRef.current.y);
        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
          hasDraggedRef.current = true;
        }
      }
    };

    const handleClick = (): void => {
      // Only navigate if we didn't drag
      if (!hasDraggedRef.current && !isDragging) {
        window.open(project.repositoryUrl.toString(), '_blank', 'noopener,noreferrer');
      }
      // Reset for next interaction
      pointerStartRef.current = null;
      hasDraggedRef.current = false;
    };

    // Merge our handlers with dnd-kit listeners
    const mergedListeners = {
      ...listeners,
      onPointerDown: handlePointerDown,
    };

    return (
      <article
        {...attributes}
        {...mergedListeners}
        {...props}
        ref={handleRef}
        style={style}
        className={classNames}
        data-dragging={isDragging || undefined}
        aria-label={`${project.name} - Click to view repository`}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onKeyDown={(e): void => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(project.repositoryUrl.toString(), '_blank', 'noopener,noreferrer');
          }
        }}
      >
        <div className={styles.link}>
          <ProjectCardPreview
            src={project.previewImage.toString()}
            alt={`Preview of ${project.name}`}
            type={project.previewType}
          />
          <ProjectCardContent project={project} />
        </div>
      </article>
    );
  }
);
