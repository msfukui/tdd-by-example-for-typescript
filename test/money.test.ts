import assert = require("assert");
import Money from "../src/money";

describe("Money", () => {
  it("Multiplication Test", () => {
    let five: Money.Dollar = new Money.Dollar(5);
    let product: Money.Dollar = five.times(2);
    assert(10 === product.amount);
    product = five.times(3);
    assert(15 === product.amount);
  });
});
