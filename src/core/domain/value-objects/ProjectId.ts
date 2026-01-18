/**
 * ProjectId Value Object
 * Represents a unique identifier for a project
 * Immutable and validated on creation
 */
export class ProjectId {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    Object.freeze(this);
  }

  public static create(value: string): ProjectId {
    const trimmed = value.trim();
    if (!ProjectId.isValid(trimmed)) {
      throw new Error(`Invalid ProjectId: "${value}". Must be a non-empty string.`);
    }
    return new ProjectId(trimmed);
  }

  public static generate(): ProjectId {
    const uuid = crypto.randomUUID();
    return new ProjectId(`project-${uuid}`);
  }

  private static isValid(value: string): boolean {
    return value.length > 0;
  }

  public get value(): string {
    return this._value;
  }

  public toString(): string {
    return this._value;
  }

  public equals(other: ProjectId): boolean {
    return this._value === other._value;
  }
}
