namespace Money {
  interface Expression {}

  export class Bank {
    reduce(source: Expression, to: string): Money {
      return Money.dollar(10);
    }
  }

  export class Money implements Expression {
    protected amount: number = 0;
    protected cur: string = "";

    constructor(amount: number, currency: string) {
      this.amount = amount;
      this.cur = currency;
    }

    public times(multiplier: number): Money {
      return new Money(this.amount * multiplier, this.cur);
    }

    public plus(addend: Money): Expression {
      return new Money(this.amount + addend.amount, this.cur);
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
}

export default Money;
