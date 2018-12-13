namespace Money {
  export abstract class Money {
    protected amount: number = 0;
    protected cur: string = "";

    constructor(amount: number, currency: string) {
      this.amount = amount;
      this.cur = currency;
    }

    abstract times(multiplier: number): Money;

    public currency(): string {
      return this.cur;
    }

    public equals(object: any): boolean {
      const money = object as Money;
      return (
        this.amount === money.amount &&
        this.constructor.name === money.constructor.name
      );
    }

    static dollar(amount: number): Money {
      return new Dollar(amount, "USD");
    }

    static franc(amount: number): Money {
      return new Franc(amount, "CHF");
    }
  }

  export class Dollar extends Money {
    constructor(amount: number, currency: string) {
      super(amount, currency);
    }

    public times(multiplier: number): Money {
      return Money.dollar(this.amount * multiplier);
    }
  }

  export class Franc extends Money {
    constructor(amount: number, currency: string) {
      super(amount, currency);
    }

    public times(multiplier: number): Money {
      return Money.franc(this.amount * multiplier);
    }
  }
}

export default Money;
