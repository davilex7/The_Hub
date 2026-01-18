/**
 * ProjectCardContent Sub-component
 * Displays the project title, description, and technologies
 */
import type { Project } from '../../../../core/domain/entities';
import { Text } from '../../atoms';
import { TechnologyBadge } from '../TechnologyBadge';
import styles from './ProjectCard.module.css';

interface ProjectCardContentProps {
  readonly project: Project;
}

export function ProjectCardContent({
  project,
}: ProjectCardContentProps): JSX.Element {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <Text as="h3" variant="h5" className={styles.title}>
          {project.name}
        </Text>
        {project.featured && (
          <span className={styles.featuredBadge} aria-label="Featured project">
            Featured
          </span>
        )}
      </div>

      <Text variant="bodySmall" color="secondary" className={styles.description}>
        {project.description}
      </Text>

      <div className={styles.technologies} role="list" aria-label="Technologies used">
        {project.technologies.map((tech) => (
          <TechnologyBadge
            key={tech.normalizedName}
            name={tech.name}
            role="listitem"
          />
        ))}
      </div>
    </div>
  );
}
