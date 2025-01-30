import { SkillAction } from '../skill-action';
import { Kitten } from '../kitten';

export class AgilityBoost implements SkillAction {
  name = 'Agility Boost';
  cooldown = 3;
  currentCooldown = 0;
  private buff = { stat: 'agility', amount: 5 };

  use(attacker: Kitten, defender: Kitten) {
    attacker.attributes.increaseStat(this.buff.stat, this.buff.amount);
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
