/**
 * ProjectsContext
 * Provides project data and actions to child components
 */
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';

import type { Project } from '../../core/domain/entities';
import { useProjects } from '../hooks';

interface ProjectsContextValue {
  readonly projects: readonly Project[];
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly reorder: (fromIndex: number, toIndex: number) => void;
  readonly resetOrder: () => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

interface ProjectsProviderProps {
  readonly children: ReactNode;
}

export function ProjectsProvider({
  children,
}: ProjectsProviderProps): JSX.Element {
  const projectsState = useProjects();

  return (
    <ProjectsContext.Provider value={projectsState}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext(): ProjectsContextValue {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectsContext must be used within a ProjectsProvider');
  }
  return context;
}
