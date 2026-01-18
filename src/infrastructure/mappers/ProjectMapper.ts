/**
 * ProjectMapper
 * Maps raw data to domain entities
 * Handles transformation and validation at the boundary
 */
import { Project } from '../../core/domain/entities';
import type { RawProjectData } from '../../core/domain/types';
import { ImagePath, ProjectId, Technology, Url } from '../../core/domain/value-objects';

export class ProjectMapper {
  /**
   * Map raw JSON data to a Project entity
   */
  public static toDomain(raw: RawProjectData): Project {
    return Project.create({
      id: ProjectId.create(raw.id),
      name: raw.name,
      description: raw.description,
      repositoryUrl: Url.create(raw.repositoryUrl),
      previewImage: ImagePath.create(raw.previewImage),
      previewType: raw.previewType,
      technologies: raw.technologies.map((t) => Technology.create(t)),
      featured: raw.featured,
      createdAt: new Date(raw.createdAt),
    });
  }

  /**
   * Map multiple raw data items to Project entities
   * Skips invalid entries and logs warnings
   */
  public static toDomainList(rawList: readonly RawProjectData[]): readonly Project[] {
    const projects: Project[] = [];

    for (const raw of rawList) {
      try {
        projects.push(ProjectMapper.toDomain(raw));
      } catch (error) {
        // In a real app, we might use a proper logging service
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.warn(`Failed to map project "${raw.id}":`, error);
        }
      }
    }

    return projects;
  }
}
