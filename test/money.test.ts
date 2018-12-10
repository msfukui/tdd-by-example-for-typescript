import assert = require("assert");
import Money from "../src/money";

describe("Money module", () => {
  it("Multiplication Test", () => {
    let five = Money.Money.dollar(5);
    assert(five.times(2).equals(Money.Money.dollar(10)));
    assert(five.times(3).equals(Money.Money.dollar(15)));
  });

  it("Equality Test", () => {
    assert(Money.Money.dollar(5).equals(Money.Money.dollar(5)));
    assert(! Money.Money.dollar(5).equals(Money.Money.dollar(6)));
    assert(Money.Money.franc(5).equals(Money.Money.franc(5)));
    assert(! Money.Money.franc(5).equals(Money.Money.franc(6)));
    assert(! Money.Money.franc(5).equals(Money.Money.dollar(5)));
  });

  it("Franc Multiplication Test", () => {
    let five = Money.Money.franc(5);
    assert(five.times(2).equals(Money.Money.franc(10)));
    assert(five.times(3).equals(Money.Money.franc(15)));
  });
});
