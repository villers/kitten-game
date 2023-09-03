export type BuffEffect = {
  type:
    | 'increaseAttack'
    | 'increaseDefense'
    | 'reduceDefense'
    | 'heal'
    | 'damage'
    | 'reduceAttack';
  value: number;
};

export class Buff {
  constructor(
    public name: string,
    public duration: number,
    public effect: BuffEffect,
  ) {}
}
