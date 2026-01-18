/**
 * Dependency Injection Configuration
 * Wires together the application's dependencies
 * This is the composition root of the application
 */
import {
  FilterProjectsByTechnology,
  GetAllProjects,
  GetProjectById,
  ReorderProjects,
} from '../core/application/use-cases';
import { ProjectOrderService } from '../core/application/services';
import {
  JsonProjectRepository,
  LocalStorageOrderPersistence,
} from '../infrastructure';
import type { ProjectsDataFile } from '../core/domain/types';
import projectsData from '../data/projects.json';
import { STORAGE_KEYS } from './constants';

// Infrastructure
const projectRepository = new JsonProjectRepository(
  projectsData as unknown as ProjectsDataFile
);
const orderPersistence = new LocalStorageOrderPersistence(
  STORAGE_KEYS.PROJECT_ORDER
);

// Services
export const projectOrderService = new ProjectOrderService();

// Use Cases
export const getAllProjects = new GetAllProjects(
  projectRepository,
  orderPersistence
);

export const getProjectById = new GetProjectById(projectRepository);

export const filterProjectsByTechnology = new FilterProjectsByTechnology(
  projectRepository
);

export const reorderProjects = new ReorderProjects(orderPersistence);
