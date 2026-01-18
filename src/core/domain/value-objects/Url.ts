/**
 * Url Value Object
 * Represents a validated URL
 * Immutable and validated on creation
 */
export class Url {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    Object.freeze(this);
  }

  public static create(value: string): Url {
    if (!Url.isValid(value)) {
      throw new Error(`Invalid URL: "${value}"`);
    }
    return new Url(value);
  }

  private static isValid(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  public get value(): string {
    return this._value;
  }

  public toString(): string {
    return this._value;
  }

  public equals(other: Url): boolean {
    return this._value === other._value;
  }

  public get hostname(): string {
    return new URL(this._value).hostname;
  }

  public get isGitHub(): boolean {
    return this.hostname === 'github.com';
  }
}
