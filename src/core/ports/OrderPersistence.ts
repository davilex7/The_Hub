/**
 * OrderPersistence Port
 * Interface for persisting project order
 * Implementation details are in infrastructure layer
 */
import type { ProjectId } from '../domain/value-objects';

export interface OrderPersistence {
  /**
   * Save the current order of projects
   */
  save(order: readonly ProjectId[]): void;

  /**
   * Load the saved order of projects
   * Returns null if no order has been saved
   */
  load(): readonly ProjectId[] | null;

  /**
   * Clear the saved order
   */
  clear(): void;
}
