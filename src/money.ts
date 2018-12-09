namespace Money {
  export class Dollar {
    public amount: number = 0;

    constructor(amount: number) {
      this.amount = amount;
    }

    times(multiplier: number): Dollar {
      return new Dollar(this.amount * multiplier);
    }

    equals(object: any): boolean {
      const dollar = object as Dollar;
      return this.amount === dollar.amount;
    }
  }
}

export default Money;
