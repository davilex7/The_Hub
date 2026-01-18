/**
 * GetProjectById Use Case
 * Retrieves a single project by its ID
 */
import type { Project } from '../../domain/entities';
import type { ProjectId } from '../../domain/value-objects';
import type { ProjectRepository } from '../../ports';

export class GetProjectById {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async execute(id: ProjectId): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }
}
