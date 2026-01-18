/**
 * JsonProjectRepository
 * Implementation of ProjectRepository that reads from JSON data
 */
import type { Project } from '../../core/domain/entities';
import type { ProjectsDataFile } from '../../core/domain/types';
import type { ProjectId, Technology } from '../../core/domain/value-objects';
import type { ProjectRepository } from '../../core/ports';
import { ProjectMapper } from '../mappers';

export class JsonProjectRepository implements ProjectRepository {
  private readonly projects: readonly Project[];

  constructor(data: ProjectsDataFile) {
    this.projects = ProjectMapper.toDomainList(data.projects);
  }

  public async findAll(): Promise<readonly Project[]> {
    return Promise.resolve(this.projects);
  }

  public async findById(id: ProjectId): Promise<Project | null> {
    const project = this.projects.find((p) => p.id.equals(id));
    return Promise.resolve(project ?? null);
  }

  public async findByTechnology(technologyName: string): Promise<readonly Project[]> {
    const normalizedSearch = technologyName.toLowerCase().trim();
    const filtered = this.projects.filter((p) =>
      p.technologies.some(
        (t: Technology) => t.name.toLowerCase() === normalizedSearch
      )
    );
    return Promise.resolve(filtered);
  }

  public async findFeatured(): Promise<readonly Project[]> {
    const featured = this.projects.filter((p) => p.featured);
    return Promise.resolve(featured);
  }
}
