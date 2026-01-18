/**
 * useProjects Hook
 * Manages project data loading, ordering, and persistence
 */
import { useCallback, useEffect, useState } from 'react';

import type { Project } from '../../core/domain/entities';
import {
  getAllProjects,
  projectOrderService,
  reorderProjects,
} from '../../config';

interface UseProjectsReturn {
  readonly projects: readonly Project[];
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly reorder: (fromIndex: number, toIndex: number) => void;
  readonly resetOrder: () => void;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<readonly Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load projects on mount
  useEffect(() => {
    let mounted = true;

    const loadProjects = async (): Promise<void> => {
      try {
        const loadedProjects = await getAllProjects.execute();
        if (mounted) {
          setProjects(loadedProjects);
          setError(null);
        }
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e : new Error('Failed to load projects'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadProjects();

    return (): void => {
      mounted = false;
    };
  }, []);

  // Reorder projects
  const reorder = useCallback(
    (fromIndex: number, toIndex: number): void => {
      setProjects((prev) => {
        const newOrder = projectOrderService.reorder(prev, fromIndex, toIndex);
        const ids = projectOrderService.extractIds(newOrder);
        reorderProjects.execute(ids);
        return newOrder;
      });
    },
    []
  );

  // Reset to default order
  const resetOrder = useCallback((): void => {
    reorderProjects.clearOrder();
    // Reload projects to get default order
    void getAllProjects.execute().then(setProjects);
  }, []);

  return {
    projects,
    isLoading,
    error,
    reorder,
    resetOrder,
  };
}
