/**
 * FilterProjectsByTechnology Use Case
 * Retrieves projects that use a specific technology
 */
import type { Project } from '../../domain/entities';
import type { ProjectRepository } from '../../ports';

export class FilterProjectsByTechnology {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async execute(technologyName: string): Promise<readonly Project[]> {
    if (!technologyName.trim()) {
      return this.projectRepository.findAll();
    }
    return this.projectRepository.findByTechnology(technologyName);
  }
}
