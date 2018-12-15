import assert = require("assert");
import Money from "../src/money";

describe("Money module", () => {
  it("Multiplication Test", () => {
    let five = Money.dollar(5);
    assert(five.times(2).equals(Money.dollar(10)));
    assert(five.times(3).equals(Money.dollar(15)));
  });

  it("Equality Test", () => {
    assert(Money.dollar(5).equals(Money.dollar(5)));
    assert(! Money.dollar(5).equals(Money.dollar(6)));
    assert(! Money.franc(5).equals(Money.dollar(5)));
  });

  it("Currency Test", () => {
    assert("USD", Money.dollar(1).currency());
    assert("CHF", Money.franc(1).currency());
  });
});
