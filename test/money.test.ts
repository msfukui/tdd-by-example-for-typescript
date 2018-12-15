import assert = require("assert");
import Money from "../src/money";

describe("Money module", () => {
  it("Multiplication Test", () => {
    const five = Money.Money.dollar(5);
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
    const five = Money.Money.dollar(5);
    const sum = five.plus(five);
    const bank = new Money.Bank();
    const reduced = bank.reduce(sum, "USD");
    assert(Money.Money.dollar(10).equals(reduced));
  });

  it("Plus Returns Sum", () => {
    const five = Money.Money.dollar(5);
    const result = five.plus(five);
    const sum = result as Money.Sum;
    assert(five.equals(sum.augend));
    assert(five.equals(sum.addend));
  });

  it("Sum Reduce Test", () => {
    const sum = new Money.Sum(Money.Money.dollar(3), Money.Money.dollar(4));
    const bank = new Money.Bank();
    const result = bank.reduce(sum, "USD");
    assert(Money.Money.dollar(7).equals(result));
  });

  it("Money Reduce Test", () => {
    const bank = new Money.Bank(); 
    const result = bank.reduce(Money.Money.dollar(1), "USD");
    assert(Money.Money.dollar(1).equals(result));
  });

  it("Reduce Money Different Currency Test", () => {
    const bank = new Money.Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(Money.Money.franc(2), "USD");
    assert(Money.Money.dollar(1).equals(result));
  });

  it("identity Rate Test", () => {
    assert(1 === new Money.Bank().rate("USD", "USD"));
  });
});
