/**
 * Technology Value Object
 * Represents a technology/tool used in a project
 * Immutable and validated on creation
 */
export class Technology {
  private readonly _name: string;
  private readonly _normalizedName: string;

  private constructor(name: string) {
    this._name = name;
    this._normalizedName = name.toLowerCase().replace(/\s+/g, '-');
    Object.freeze(this);
  }

  public static create(name: string): Technology {
    const trimmed = name.trim();
    if (!Technology.isValid(trimmed)) {
      throw new Error(`Invalid Technology name: "${name}". Must be a non-empty string.`);
    }
    return new Technology(trimmed);
  }

  private static isValid(name: string): boolean {
    return name.length > 0 && name.length <= 50;
  }

  public get name(): string {
    return this._name;
  }

  public get normalizedName(): string {
    return this._normalizedName;
  }

  public toString(): string {
    return this._name;
  }

  public equals(other: Technology): boolean {
    return this._normalizedName === other._normalizedName;
  }

  /**
   * Get CSS class-safe identifier
   */
  public get cssClass(): string {
    return `tech-${this._normalizedName}`;
  }
}
