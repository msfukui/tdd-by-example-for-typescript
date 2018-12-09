namespace Money {
  export class Dollar {
    private amount: number = 0;

    constructor(amount: number) {
      this.amount = amount;
    }

    public times(multiplier: number): Dollar {
      return new Dollar(this.amount * multiplier);
    }

    public equals(object: any): boolean {
      const dollar = object as Dollar;
      return this.amount === dollar.amount;
    }
  }
}

export default Money;
