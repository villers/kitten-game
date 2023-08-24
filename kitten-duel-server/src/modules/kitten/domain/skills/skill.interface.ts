import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

export interface Skill {
  isActive(attacker: Kitten, defender: Kitten): boolean;
  execute(attacker: Kitten, defender: Kitten): FightStep;
}
