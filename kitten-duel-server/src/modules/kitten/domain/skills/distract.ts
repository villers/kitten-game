import { Skill, SkillArgs } from './skill.interface';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight.entity';
import { Buff } from '../entities/buff.entity';

export class Distract implements Skill {
  activationChance = 10;

  constructor(
    private readonly buffService: BuffService,
    private randomService: RandomService,
  ) {}

  isActive({ defender }: SkillArgs): boolean {
    return (
      !this.buffService
        .getBuffsForKitten(defender)
        .some((buff) => buff.name === 'Distracted') &&
      this.randomService.numberBelow(100) <= this.activationChance
    );
  }

  execute({ attacker, defender }: SkillArgs): FightStep {
    const buff = new Buff('Distracted', 1, null);
    this.buffService.applyBuff(defender, buff);
    return new FightStep(
      attacker,
      defender,
      'distract',
      0,
      0,
      'Distraction! Le défenseur pourrait perdre son prochain tour.',
    );
  }
}
