import assert = require("assert");
import Money from "../src/money";

describe("Money module", () => {
  it("Multiplication Test", () => {
    let five: Money.Dollar = new Money.Dollar(5);
    assert(five.times(2).equals(new Money.Dollar(10)));
    assert(five.times(3).equals(new Money.Dollar(15)));
  });

  it("Equality Test", () => {
    assert(new Money.Dollar(5).equals(new Money.Dollar(5)));
    assert(! new Money.Dollar(5).equals(new Money.Dollar(6)));
  });
});
