import { StatusEffect } from './status-effect';
import { Kitten } from '@game/game/kitten/domain/kitten';

export class KittenStatus {
  private _statusEffects: StatusEffect[] = [];

  applyEffect(effect: StatusEffect) {
    this._statusEffects.push(effect);
  }

  processStatusEffects(target: Kitten) {
    this._statusEffects = this._statusEffects.filter((effect) => {
      effect.apply(target);
      return effect.duration > 0;
    });
  }
}
