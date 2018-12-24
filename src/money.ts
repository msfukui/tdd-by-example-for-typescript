import Expression from "./expression";
import Bank from "./bank";
import Sum from "./sum";

export class Money implements Expression {
  protected amount: number;
  protected cur: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.cur = currency;
  }

  public times(multiplier: number): Expression {
    return new Money(this.amount * multiplier, this.cur);
  }

  public plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  public reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this.cur, to);
    return new Money(this.amount / rate, to);
  }

  public currency(): string {
    return this.cur;
  }

  public equals(object: any): boolean {
    const money = object as Money;
    return this.amount === money.amount && this.currency() === money.currency();
  }

  public toString(): string {
    return this.amount + " " + this.cur;
  }

  public getAmount(): number {
    return this.amount;
  }

  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }
}
export default Money;
