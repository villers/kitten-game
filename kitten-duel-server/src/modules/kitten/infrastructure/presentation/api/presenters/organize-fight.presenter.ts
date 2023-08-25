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
      attacker: {
        id: output.fight.attacker.id,
        name: output.fight.attacker.name,
        hp: output.fight.attacker.hp,
        maxHp: output.fight.attacker.maxHp,
        strength: output.fight.attacker.strength,
        dexterity: output.fight.attacker.dexterity,
        vitality: output.fight.attacker.vitality,
        luck: output.fight.attacker.luck,
        agility: output.fight.attacker.agility,
        level: output.fight.attacker.level,
        victories: output.fight.attacker.victories,
        defeats: output.fight.attacker.defeats,
        xp: output.fight.attacker.xp,
      },
      defender: {
        id: output.fight.defender.id,
        name: output.fight.defender.name,
        hp: output.fight.defender.hp,
        maxHp: output.fight.defender.maxHp,
        strength: output.fight.defender.strength,
        dexterity: output.fight.defender.dexterity,
        vitality: output.fight.defender.vitality,
        luck: output.fight.defender.luck,
        agility: output.fight.defender.agility,
        level: output.fight.defender.level,
        victories: output.fight.defender.victories,
        defeats: output.fight.defender.defeats,
        xp: output.fight.defender.xp,
      },
      winner: {
        id: output.fight.winner.id,
        name: output.fight.winner.name,
        hp: output.fight.winner.hp,
        maxHp: output.fight.winner.maxHp,
        strength: output.fight.winner.strength,
        dexterity: output.fight.winner.dexterity,
        vitality: output.fight.winner.vitality,
        luck: output.fight.winner.luck,
        agility: output.fight.winner.agility,
        level: output.fight.winner.level,
        victories: output.fight.winner.victories,
        defeats: output.fight.winner.defeats,
        xp: output.fight.winner.xp,
      },
      looser: {
        id: output.fight.looser.id,
        name: output.fight.looser.name,
        hp: output.fight.looser.hp,
        maxHp: output.fight.looser.maxHp,
        strength: output.fight.looser.strength,
        dexterity: output.fight.looser.dexterity,
        vitality: output.fight.looser.vitality,
        luck: output.fight.looser.luck,
        agility: output.fight.looser.agility,
        level: output.fight.looser.level,
        victories: output.fight.looser.victories,
        defeats: output.fight.looser.defeats,
        xp: output.fight.looser.xp,
      },
      expGained: output.fight.xpGained,
      steps: output.fight.steps,
    };
  }
}
