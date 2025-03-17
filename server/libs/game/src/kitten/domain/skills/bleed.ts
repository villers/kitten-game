import { SkillAction } from '../skill-action';
import { Kitten } from '../kitten';
import { StatusEffect } from '@game/game/kitten/domain/status-effect';

export class Bleed implements SkillAction {
  name = 'Bleed';
  cooldown = 3;
  currentCooldown = 0;
  private damage = 20;
  private duration = 3;

  use(attacker: Kitten, defender: Kitten) {
    defender.status.applyEffect(
      new StatusEffect('bleed', this.damage, this.duration, (k: Kitten) => {}),
    );
    this.currentCooldown = this.cooldown;
  }

  isOnCooldown() {
    return this.currentCooldown > 0;
  }

  reduceCooldown() {
    if (this.currentCooldown > 0) {
      this.currentCooldown -= 1;
    }
  }
}
