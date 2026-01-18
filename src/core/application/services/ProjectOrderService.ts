/**
 * ProjectOrderService
 * Application service for managing project ordering
 */
import type { Project } from '../../domain/entities';
import type { ProjectId } from '../../domain/value-objects';

export class ProjectOrderService {
  /**
   * Reorder an array by moving an item from one index to another
   */
  public reorder(
    projects: readonly Project[],
    fromIndex: number,
    toIndex: number
  ): readonly Project[] {
    if (fromIndex < 0 || fromIndex >= projects.length) {
      throw new Error(`Invalid fromIndex: ${fromIndex}`);
    }
    if (toIndex < 0 || toIndex >= projects.length) {
      throw new Error(`Invalid toIndex: ${toIndex}`);
    }
    if (fromIndex === toIndex) {
      return projects;
    }

    const result = [...projects];
    const [removed] = result.splice(fromIndex, 1);
    if (removed) {
      result.splice(toIndex, 0, removed);
    }
    return result;
  }

  /**
   * Extract project IDs in order
   */
  public extractIds(projects: readonly Project[]): readonly ProjectId[] {
    return projects.map((p) => p.id);
  }
}
