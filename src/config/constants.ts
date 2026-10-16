/**
 * Application Constants
 * Centralized configuration values
 */

export const STORAGE_KEYS = {
  PROJECT_ORDER: 'dashboard-project-order',
} as const;

export const APP_CONFIG = {
  siteName: 'The Hub',
  siteDescription: 'A showcase of my development projects',
  authorName: 'David González',
  authorGithub: 'https://github.com/davilex7',
} as const;

export const DRAG_CONFIG = {
  activationDelay: 150,
  activationDistance: 8,
  animationDuration: 300,
} as const;
