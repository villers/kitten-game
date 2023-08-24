import { OrganizeFightOutput } from '../../../../domain/usecases/organize-fight.usecase';
import { ApiProperty } from '@nestjs/swagger';

class Kitten {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  @ApiProperty()
  hp: number;
  @ApiProperty()
  maxHp: number;
  @ApiProperty()
  strength: number;
  @ApiProperty()
  dexterity: number;
  @ApiProperty()
  vitality: number;
  @ApiProperty()
  luck: number;
  @ApiProperty()
  agility: number;
  @ApiProperty()
  level: number;
  @ApiProperty()
  victories: number;
  @ApiProperty()
  defeats: number;
  @ApiProperty()
  xp: number;
}

class FightStep {
  @ApiProperty()
  action: string;
  @ApiProperty()
  attacker: Kitten;
  @ApiProperty()
  defender: Kitten;
  @ApiProperty()
  damageDealt: number;
  @ApiProperty()
  description: string;
}

export class OrganizeFightPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  attacker: Kitten;
  @ApiProperty()
  defender: Kitten;
  @ApiProperty()
  winner: Kitten;
  @ApiProperty()
  looser: Kitten;
  @ApiProperty()
  expGained: number;
  @ApiProperty({ type: [FightStep] }) // To specify that it's an array of steps
  steps: FightStep[] = [];

  static toPresent(output: OrganizeFightOutput): OrganizeFightPresenter {
    return {
      id: output.fight.id,
      attacker: output.fight.attacker,
      defender: output.fight.defender,
      winner: output.fight.winner,
      looser: output.fight.looser,
      expGained: output.fight.xpGained,
      steps: output.fight.steps,
    };
  }
}
