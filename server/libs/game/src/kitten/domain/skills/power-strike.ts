import { SkillAction } from '../skill-action';
import { Kitten } from '../kitten';

export class PowerStrike implements SkillAction {
  name = 'Power Strike';
  cooldown = 3;
  currentCooldown = 0;
  private damage = 50;

  use(attacker: Kitten, defender: Kitten) {
    defender.attributes.takeDamage(this.damage);
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
