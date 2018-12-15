namespace Money {
  interface Expression {
    reduce(to: string): Money;
  }

  export class Bank {
    reduce(source: Expression, to: string): Money {
      return source.reduce(to);
    }
  }

  export class Sum implements Expression {
    public augend: Money;
    public addend: Money;

    constructor(augend: Money, addend: Money) {
      this.augend = augend;
      this.addend = addend;
    }

    public reduce(to: string) {
      let amount = this.augend.getAmount() + this.addend.getAmount();
      return new Money(amount, to);
    }
  }

  export class Money implements Expression {
    protected amount: number;
    protected cur: string;

    constructor(amount: number, currency: string) {
      this.amount = amount;
      this.cur = currency;
    }

    public times(multiplier: number): Money {
      return new Money(this.amount * multiplier, this.cur);
    }

    public plus(addend: Money): Expression {
      return new Sum(this, addend);
    }

    public reduce(to: string) {
      return this;
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

    public getAmount() {
      return this.amount;
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
