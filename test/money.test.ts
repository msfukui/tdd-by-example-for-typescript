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
    assert(! Money.Money.franc(5).equals(Money.Money.dollar(5)));
  });

  it("Currency Test", () => {
    assert("USD", Money.Money.dollar(1).currency());
    assert("CHF", Money.Money.franc(1).currency());
  });

  it("Simple Addition Test", () => {
    let five = Money.Money.dollar(5);
    let sum = five.plus(five);
    let bank = new Money.Bank();
    let reduced = bank.reduce(sum, "USD");
    assert(Money.Money.dollar(10).equals(reduced));
  });
});
