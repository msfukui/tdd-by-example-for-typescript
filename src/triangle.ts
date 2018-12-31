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

      if (this.isIrrational(k, this.sides)) {
        throw new TriangleError("Triangle creation error.");
      }
    });
  }

  public check(): number {
    if (this.isEquilateral(this.sides)) {
      return 1;
    } else if (this.isIsosceles(this.sides)) {
      return 2;
    } else {
      return 3;
    }
  }

  private isIrrational(key: number, array: number[]): boolean {
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

  private isEquilateral(array: number[]): boolean {
    if (array[0] === array[1] && array[1] === array[2]) {
      return true;
    }
    return false;
  }

  private isIsosceles(array: number[]): boolean {
    if (this.isEquilateral(array)) {
      return false;
    }
    if (
      array[0] === array[1] ||
      array[1] === array[2] ||
      array[2] === array[0]
    ) {
      return true;
    }
    return false;
  }
}

export default Triangle;
