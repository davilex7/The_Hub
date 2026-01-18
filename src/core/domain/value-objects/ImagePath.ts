/**
 * ImagePath Value Object
 * Represents a path to an image resource
 * Immutable and validated on creation
 */
export class ImagePath {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    Object.freeze(this);
  }

  public static create(value: string): ImagePath {
    const trimmed = value.trim();
    if (!ImagePath.isValid(trimmed)) {
      throw new Error(`Invalid ImagePath: "${value}". Must be a valid path.`);
    }
    return new ImagePath(trimmed);
  }

  private static isValid(value: string): boolean {
    if (value.length === 0) {
      return false;
    }

    // Allow absolute paths starting with /
    // Allow relative paths
    // Allow URLs
    if (value.startsWith('/') || value.startsWith('./') || value.startsWith('../')) {
      return true;
    }

    // Allow full URLs
    try {
      new URL(value);
      return true;
    } catch {
      // Not a URL, check if it looks like a path
      return /^[\w\-./]+$/.test(value);
    }
  }

  public get value(): string {
    return this._value;
  }

  public toString(): string {
    return this._value;
  }

  public equals(other: ImagePath): boolean {
    return this._value === other._value;
  }

  public get extension(): string {
    const parts = this._value.split('.');
    return parts.length > 1 ? parts[parts.length - 1]?.toLowerCase() ?? '' : '';
  }

  public get isAnimated(): boolean {
    const ext = this.extension;
    return ext === 'gif' || ext === 'webp' || ext === 'apng';
  }
}
