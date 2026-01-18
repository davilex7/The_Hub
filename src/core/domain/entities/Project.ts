/**
 * Project Entity
 * Core domain entity representing a portfolio project
 * Immutable - changes create new instances
 */
import type { PreviewType } from '../types';
import { ImagePath, ProjectId, Technology, Url } from '../value-objects';

export interface ProjectProps {
  readonly id: ProjectId;
  readonly name: string;
  readonly description: string;
  readonly repositoryUrl: Url;
  readonly previewImage: ImagePath;
  readonly previewType: PreviewType;
  readonly technologies: readonly Technology[];
  readonly featured: boolean;
  readonly createdAt: Date;
}

export class Project {
  private readonly props: ProjectProps;

  private constructor(props: ProjectProps) {
    this.props = props;
    Object.freeze(this);
  }

  public static create(props: ProjectProps): Project {
    Project.validate(props);
    return new Project(props);
  }

  private static validate(props: ProjectProps): void {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Project name is required');
    }
    if (props.name.length > 100) {
      throw new Error('Project name must be 100 characters or less');
    }
    if (!props.description || props.description.trim().length === 0) {
      throw new Error('Project description is required');
    }
    if (props.description.length > 500) {
      throw new Error('Project description must be 500 characters or less');
    }
    if (props.technologies.length === 0) {
      throw new Error('At least one technology is required');
    }
  }

  public get id(): ProjectId {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get repositoryUrl(): Url {
    return this.props.repositoryUrl;
  }

  public get previewImage(): ImagePath {
    return this.props.previewImage;
  }

  public get previewType(): PreviewType {
    return this.props.previewType;
  }

  public get technologies(): readonly Technology[] {
    return this.props.technologies;
  }

  public get featured(): boolean {
    return this.props.featured;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  /**
   * Check if project uses a specific technology
   */
  public usesTechnology(technology: Technology): boolean {
    return this.props.technologies.some((t) => t.equals(technology));
  }

  /**
   * Check if project name or description contains search term
   */
  public matchesSearch(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return (
      this.props.name.toLowerCase().includes(term) ||
      this.props.description.toLowerCase().includes(term) ||
      this.props.technologies.some((t) =>
        t.name.toLowerCase().includes(term)
      )
    );
  }

  /**
   * Create a copy with updated properties
   */
  public with(updates: Partial<ProjectProps>): Project {
    return Project.create({
      ...this.props,
      ...updates,
    });
  }

  public equals(other: Project): boolean {
    return this.props.id.equals(other.props.id);
  }
}
