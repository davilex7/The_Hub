/**
 * ProjectRepository Port
 * Interface for project data access
 * Implementation details are in infrastructure layer
 */
import type { Project } from '../domain/entities';
import type { ProjectId } from '../domain/value-objects';

export interface ProjectRepository {
  /**
   * Get all projects
   */
  findAll(): Promise<readonly Project[]>;

  /**
   * Find a project by its ID
   */
  findById(id: ProjectId): Promise<Project | null>;

  /**
   * Find projects that use a specific technology
   */
  findByTechnology(technologyName: string): Promise<readonly Project[]>;

  /**
   * Find featured projects
   */
  findFeatured(): Promise<readonly Project[]>;
}
