/**
 * Domain Types
 * Shared type definitions for the domain layer
 */

/**
 * Preview type for project cards
 */
export type PreviewType = 'image' | 'gif' | 'video';

/**
 * Raw project data structure (from JSON)
 */
export interface RawProjectData {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly repositoryUrl: string;
  readonly previewImage: string;
  readonly previewType: PreviewType;
  readonly technologies: readonly string[];
  readonly featured: boolean;
  readonly createdAt: string;
}

/**
 * Projects data file structure
 */
export interface ProjectsDataFile {
  readonly projects: readonly RawProjectData[];
}
