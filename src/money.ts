namespace Money {
  export class Money {
    protected amount: number = 0;

    public equals(object: any): boolean {
      const money = object as Money;
      return (
        this.amount === money.amount &&
        this.constructor.name === money.constructor.name
      );
    }
  }

  export class Dollar extends Money {
    constructor(amount: number) {
      super();
      this.amount = amount;
    }

    public times(multiplier: number): Dollar {
      return new Dollar(this.amount * multiplier);
    }
  }

  export class Franc extends Money {
    constructor(amount: number) {
      super();
      this.amount = amount;
    }

    public times(multiplier: number): Franc {
      return new Franc(this.amount * multiplier);
    }
  }
}

export default Money;
