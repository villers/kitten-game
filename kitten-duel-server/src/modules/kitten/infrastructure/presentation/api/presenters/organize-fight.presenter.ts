import { OrganizeFightOutput } from '../../../../domain/usecases/organize-fight.usecase';
import { ApiProperty } from '@nestjs/swagger';

class Kitten {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  power: number;

  @ApiProperty()
  hp: number;

  @ApiProperty()
  defense: number;

  @ApiProperty()
  speed: number;

  @ApiProperty()
  equipmentIds: string[];

  @ApiProperty()
  level: number;

  @ApiProperty()
  victories: number;

  @ApiProperty()
  defeats: number;

  @ApiProperty()
  xp: number;
}

class Step {
  @ApiProperty()
  attacker: Kitten;

  @ApiProperty()
  defender: Kitten;

  @ApiProperty()
  attackPower: number;
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

  @ApiProperty({ type: [Step] }) // To specify that it's an array of steps
  steps: Step[];

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
