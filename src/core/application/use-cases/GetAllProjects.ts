/**
 * GetAllProjects Use Case
 * Retrieves all projects with optional ordering applied
 */
import type { Project } from '../../domain/entities';
import type { ProjectId } from '../../domain/value-objects';
import type { OrderPersistence, ProjectRepository } from '../../ports';

export class GetAllProjects {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly orderPersistence: OrderPersistence
  ) {}

  public async execute(): Promise<readonly Project[]> {
    const projects = await this.projectRepository.findAll();
    const savedOrder = this.orderPersistence.load();

    if (!savedOrder || savedOrder.length === 0) {
      return this.sortByDefault(projects);
    }

    return this.applyOrder(projects, savedOrder);
  }

  private sortByDefault(projects: readonly Project[]): readonly Project[] {
    return [...projects].sort((a, b) => {
      // Featured first
      if (a.featured && !b.featured) {
        return -1;
      }
      if (!a.featured && b.featured) {
        return 1;
      }
      // Then by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  private applyOrder(
    projects: readonly Project[],
    order: readonly ProjectId[]
  ): readonly Project[] {
    const projectMap = new Map(projects.map((p) => [p.id.toString(), p]));
    const ordered: Project[] = [];

    // Add projects in saved order
    for (const id of order) {
      const project = projectMap.get(id.toString());
      if (project) {
        ordered.push(project);
        projectMap.delete(id.toString());
      }
    }

    // Add remaining projects (new ones not in saved order)
    const remaining = [...projectMap.values()].sort((a, b) => {
      if (a.featured && !b.featured) {
        return -1;
      }
      if (!a.featured && b.featured) {
        return 1;
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return [...ordered, ...remaining];
  }
}
