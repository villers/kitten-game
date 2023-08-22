import { Kitten } from './kitten.entity';

export class FightStep {
  attackPower: number;
  attacker: Kitten;
  defender: Kitten;

  constructor(partial?: Partial<FightStep>) {
    Object.assign(this, partial);
  }
}

export class FightEntity {
  id: string;
  kitten1: Kitten;
  kitten2: Kitten;
  winner: Kitten;
  looser: Kitten;
  steps: FightStep[];

  constructor(partial?: Partial<FightEntity>) {
    Object.assign(this, partial);
  }
}
