namespace Money {
  interface Expression {
    reduce(bank: Bank, to: string): Money;
  }

  export class Bank {
    private rates = new Map<number, number>();

    public reduce(source: Expression, to: string): Money {
      return source.reduce(this, to);
    }

    public addRate(from: string, to: string, rate: number): void {
      this.rates.set(new Pair(from, to).hashCode(), rate);
      return;
    }

    public rate(from: string, to: string): number {
      if (from === to) {
        return 1;
      }
      const rate = this.rates.get(new Pair(from, to).hashCode());
      if (!rate) {
        return 0;
      }
      return rate;
    }
  }

  export class Sum implements Expression {
    public augend: Money;
    public addend: Money;

    constructor(augend: Money, addend: Money) {
      this.augend = augend;
      this.addend = addend;
    }

    public reduce(bank: Bank, to: string) {
      const amount = this.augend.getAmount() + this.addend.getAmount();
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

    public reduce(bank: Bank, to: string) {
      const rate = bank.rate(this.cur, to);
      return new Money(this.amount / rate, to);
    }

    public currency(): string {
      return this.cur;
    }

    public equals(object: any): boolean {
      const money = object as Money;
      return (
        this.amount === money.amount && this.currency() === money.currency()
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

  class Pair {
    private from: string;
    private to: string;

    constructor(from: string, to: string) {
      this.from = from;
      this.to = to;
    }

    public equals(object: any): boolean {
      const pair = object as Pair;
      return this.from === pair.from && this.to === pair.to;
    }

    public hashCode(): number {
      return 0;
    }
  }
}

export default Money;
