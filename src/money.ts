export class Money {
  protected amount: number = 0;
  protected cur: string = "";

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.cur = currency;
  }

  public times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.cur);
  }

  public currency(): string {
    return this.cur;
  }

  public equals(object: any): boolean {
    const money = object as Money;
    return (
      this.amount === money.amount &&
      this.currency() === money.currency()
    );
  }

  public toString(): string {
    return this.amount + " " + this.cur;
  }

  static dollar(amount: number): Money {
    return new Money(amount, "USD");
  }

  static franc(amount: number): Money {
    return new Money(amount, "CHF");
  }
}

export default Money;
