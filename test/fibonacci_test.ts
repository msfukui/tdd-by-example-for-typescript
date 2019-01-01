import assert = require("assert");
import Fibonacci from "../src/fibonacci";

describe("Fibonacci module", () => {
  const cases: number[][] = [
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 3],
    [5, 5],
    [6, 8],
    [7, 13],
    [8, 21],
    [9, 34]
  ];
  cases.forEach(v => {
    it(`Fibonacci Test ${v[0]}`, () => {
      assert(Fibonacci.calc(v[0]) === v[1]);
    });
  });
});
