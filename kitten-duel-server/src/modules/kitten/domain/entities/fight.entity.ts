export class FightStep {
  attackerId: string;
  defenderId: string;
  attackPower: number;
  attackerHp: number;
  defenderHp: number;

  constructor(partial?: Partial<FightStep>) {
    Object.assign(this, partial);
  }
}

export class FightEntity {
  id: string;
  kitten1Id: string;
  kitten2Id: string;
  winnerId: string;
  kitten1InitialHp: number;
  kitten2InitialHp: number;
  kitten1RemainingHp: number;
  kitten2RemainingHp: number;
  steps: FightStep[];

  constructor(partial?: Partial<FightEntity>) {
    Object.assign(this, partial);
  }
}
