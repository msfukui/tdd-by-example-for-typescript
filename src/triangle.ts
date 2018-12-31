import TriangleError from "./triangle_error";

export class Triangle {
  private sides: number[] = [];

  constructor(side1: number, side2: number, side3: number) {
    this.sides[0] = side1;
    this.sides[1] = side2;
    this.sides[2] = side3;

    this.sides.forEach((v, k) => {
      if (v < 0) {
        throw new TriangleError("Negative number error.");
      }

      if (this.TriangleIrrational(k, this.sides)) {
        throw new TriangleError("Triangle creation error.");
      }
    });
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

  private TriangleIrrational(key: number, array: number[]): boolean {
    if (
      array[key] <
      array[this.getSuffix(key + 1, array)] +
        array[this.getSuffix(key + 2, array)]
    ) {
      return false;
    }
    return true;
  }

  private getSuffix(base: number, array: number[]): number {
    return base < array.length ? base : base - array.length;
  }
}

export default Triangle;
