export type BuffEffect = {
  type: 'increaseAttack' | 'reduceDefense' | 'heal' | 'damage' | 'reduceAttack';
  value: number;
};

export class Buff {
  constructor(
    public name: string,
    public duration: number,
    public effect: BuffEffect,
  ) {}
}
