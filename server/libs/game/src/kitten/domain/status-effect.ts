import { Kitten } from '@game/game/kitten/domain/kitten';

export class StatusEffect {
  constructor(
    public name: string,
    public damagePerTurn: number,
    public duration: number,
    public applyEffect: (target: Kitten) => void,
  ) {}

  apply(target: Kitten) {
    if (this.duration > 0) {
      this.applyEffect(target);
      this.duration -= 1;
    }
  }
}
