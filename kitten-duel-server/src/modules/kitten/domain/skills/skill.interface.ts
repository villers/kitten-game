import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight-step.entity';

export interface SkillArgs {
  attacker?: Kitten;
  defender?: Kitten;
}

export interface Skill {
  isActive({ attacker, defender }: SkillArgs): boolean;
  execute({ attacker, defender }: SkillArgs): FightStep;
}
