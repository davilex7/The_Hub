/**
 * LocalStorageOrderPersistence
 * Implementation of OrderPersistence using browser localStorage
 */
import { ProjectId } from '../../core/domain/value-objects';
import type { OrderPersistence } from '../../core/ports';

export class LocalStorageOrderPersistence implements OrderPersistence {
  constructor(private readonly storageKey: string) {}

  public save(order: readonly ProjectId[]): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const serialized = JSON.stringify(order.map((id) => id.toString()));
      window.localStorage.setItem(this.storageKey, serialized);
    } catch {
      // Storage might be full or disabled
      // In a real app, we might want to notify the user
    }
  }

  public load(): readonly ProjectId[] | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const stored = window.localStorage.getItem(this.storageKey);
      if (!stored) {
        return null;
      }

      const parsed = JSON.parse(stored) as unknown;
      if (!Array.isArray(parsed)) {
        return null;
      }

      const ids: ProjectId[] = [];
      for (const item of parsed) {
        if (typeof item === 'string') {
          try {
            ids.push(ProjectId.create(item));
          } catch {
            // Skip invalid IDs
          }
        }
      }

      return ids.length > 0 ? ids : null;
    } catch {
      return null;
    }
  }

  public clear(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.removeItem(this.storageKey);
    } catch {
      // Storage might be disabled
    }
  }
}
