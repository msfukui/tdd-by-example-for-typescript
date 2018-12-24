import Expression from "./expression";
import Bank from "./bank";
import Money from "./money";

export class Sum implements Expression {
  public augend: Expression;
  public addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  public times(mulpiplier: number): Expression {
    return new Sum(
      this.augend.times(mulpiplier),
      this.addend.times(mulpiplier)
    );
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public reduce(bank: Bank, to: string): Money {
    const amount =
      this.augend.reduce(bank, to).getAmount() +
      this.addend.reduce(bank, to).getAmount();
    return new Money(amount, to);
  }
}
export default Sum;
