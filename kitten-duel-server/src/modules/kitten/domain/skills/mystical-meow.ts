import { FightStep } from '../entities/fight.entity';
import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { Buff } from '../entities/buff.entity';

export class MysticalMeow implements Skill {
  static activationChance = 15;

  constructor(
    private buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({}: SkillArgs): boolean {
    return this.randomService.numberBelow(100) <= MysticalMeow.activationChance;
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const buff = new Buff('Confused', 2, {
      type: 'reduceAttack',
      value: -0.5 * defender.stats.getAttackPower(),
    });

    this.buffService.applyBuff(defender, buff);
    return new FightStep(
      attacker,
      defender,
      'mysticalMeow',
      0,
      0,
      "Miaulement mystique! L'adversaire est confus et sa chance d'attaquer est réduite.",
    );
  }
}
