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
  force: number;
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
  kitten1: Kitten;
  @ApiProperty()
  kitten2: Kitten;
  @ApiProperty()
  winner: Kitten;
  @ApiProperty()
  looser: Kitten;
  @ApiProperty({ type: [FightStep] }) // To specify that it's an array of steps
  steps: FightStep[] = [];

  static toPresent(output: OrganizeFightOutput): OrganizeFightPresenter {
    return {
      id: output.fight.id,
      kitten1: output.fight.kitten1,
      kitten2: output.fight.kitten2,
      winner: output.fight.winner,
      looser: output.fight.looser,
      steps: output.fight.steps,
    };
  }
}
