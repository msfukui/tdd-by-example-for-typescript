export class TriangleError implements Error {
  public name: string = this.constructor.name;
  public message: string = "";

  constructor(message: string) {
    this.message = message;
  }

  public toString(): string {
    return this.name + ": " + this.message;
  }
}

export default TriangleError;
