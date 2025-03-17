import { SkillAction } from '../skill-action';
import { Kitten } from '../kitten';

export class Heal implements SkillAction {
  name = 'Heal';
  cooldown = 3;
  currentCooldown = 0;
  private healing = 30;

  use(attacker: Kitten, defender: Kitten) {
    attacker.attributes.heal(this.healing);
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
