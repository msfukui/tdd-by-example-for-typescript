import Bank from "./bank";
import Money from "./money";

export interface Expression {
  times(mulpiplier: number): Expression;
  plus(addend: Expression): Expression;
  reduce(bank: Bank, to: string): Money;
}
export default Expression;
