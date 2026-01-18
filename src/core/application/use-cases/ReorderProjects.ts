/**
 * ReorderProjects Use Case
 * Persists a new order of projects
 */
import type { ProjectId } from '../../domain/value-objects';
import type { OrderPersistence } from '../../ports';

export class ReorderProjects {
  constructor(private readonly orderPersistence: OrderPersistence) {}

  public execute(newOrder: readonly ProjectId[]): void {
    this.orderPersistence.save(newOrder);
  }

  public clearOrder(): void {
    this.orderPersistence.clear();
  }
}
