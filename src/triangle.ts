import TriangleError from "./triangle_error";

export class Triangle {
  private sides: number[] = [];

  constructor(side1: number, side2: number, side3: number) {
    this.sides[0] = side1;
    this.sides[1] = side2;
    this.sides[2] = side3;

    if (
      this.sides[0] < 0 ||
      this.sides[1] < 0 ||
      this.sides[2] < 0 ||
      this.sides[0] + this.sides[1] <= this.sides[2] ||
      this.sides[1] + this.sides[2] <= this.sides[0] ||
      this.sides[2] + this.sides[0] <= this.sides[1]
    ) {
      throw new TriangleError("Triange Creation Error.");
    }
  }
  public check(): number {
    if (this.sides[0] !== this.sides[1] && this.sides[1] !== this.sides[2]) {
      return 3;
    } else if (
      this.sides[0] === this.sides[1] &&
      this.sides[1] === this.sides[2]
    ) {
      return 1;
    } else {
      return 2;
    }
  }
}

export default Triangle;
