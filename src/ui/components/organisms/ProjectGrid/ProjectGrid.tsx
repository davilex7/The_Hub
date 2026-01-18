/**
 * ProjectGrid Organism Component
 * Masonry grid layout with drag-and-drop support
 */
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import type { Project } from '../../../../core/domain/entities';
import { ProjectCard } from '../../molecules';
import styles from './ProjectGrid.module.css';

interface ProjectGridProps {
  readonly projects: readonly Project[];
  readonly onReorder: (fromIndex: number, toIndex: number) => void;
}

export function ProjectGrid({
  projects,
  onReorder,
}: ProjectGridProps): JSX.Element {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex(
        (p) => p.id.toString() === active.id
      );
      const newIndex = projects.findIndex(
        (p) => p.id.toString() === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex);
      }
    }
  };

  const projectIds = projects.map((p) => p.id.toString());

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={projectIds} strategy={rectSortingStrategy}>
        <div className={styles.grid} role="list" aria-label="Projects">
          {projects.map((project) => (
            <ProjectCard
              key={project.id.toString()}
              project={project}
              role="listitem"
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
