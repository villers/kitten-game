import { OrganizeFightOutput } from '../../../../domain/usecases/organize-fight.usecase';
import { ApiProperty } from '@nestjs/swagger';

class Step {
  @ApiProperty()
  attackerId: string;

  @ApiProperty()
  defenderId: string;

  @ApiProperty()
  attackPower: number;

  @ApiProperty()
  attackerHp: number;

  @ApiProperty()
  defenderHp: number;
}

export class OrganizeFightPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  kitten1Id: string;

  @ApiProperty()
  kitten2Id: string;

  @ApiProperty()
  winnerId: string;

  @ApiProperty()
  kitten1InitialHp: number;

  @ApiProperty()
  kitten2InitialHp: number;

  @ApiProperty()
  kitten1RemainingHp: number;

  @ApiProperty()
  kitten2RemainingHp: number;

  @ApiProperty({ type: [Step] }) // To specify that it's an array of steps
  steps: Step[];

  static toPresent(output: OrganizeFightOutput): OrganizeFightPresenter {
    return {
      id: output.fight.id,
      kitten1Id: output.fight.kitten1Id,
      kitten2Id: output.fight.kitten2Id,
      winnerId: output.fight.winnerId,
      kitten1InitialHp: output.fight.kitten1InitialHp,
      kitten2InitialHp: output.fight.kitten2InitialHp,
      kitten1RemainingHp: output.fight.kitten1RemainingHp,
      kitten2RemainingHp: output.fight.kitten2RemainingHp,
      steps: output.fight.steps,
    };
  }
}
