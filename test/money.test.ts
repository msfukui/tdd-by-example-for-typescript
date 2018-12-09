import assert = require("assert");
import Money from "../src/money";

describe("Money", () => {
  it("Multiplication Test", () => {
    let five: Money.Dollar = new Money.Dollar(5);
    five.times(2);
    assert(10 === five.amount);
  });
});
