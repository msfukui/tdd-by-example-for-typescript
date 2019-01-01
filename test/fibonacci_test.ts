import assert = require("assert");
import Fibonacci from "../src/fibonacci";

describe("Fibonacci module", () => {
  it("Fibonacci Test", () => {
    const cases: number[][] = [[0, 0], [1, 1], [2, 1], [3, 2], [4, 3], [5, 5], [6, 8]];
    cases.forEach(v => {
      assert(Fibonacci.calc(v[0]) === v[1]);
    });
  });
});
