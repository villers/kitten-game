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
        hp: output.fight.attacker.healthSystem.hp,
        maxHp: output.fight.attacker.healthSystem.maxHp,
        strength: output.fight.attacker.stats.strength,
        dexterity: output.fight.attacker.stats.dexterity,
        vitality: output.fight.attacker.stats.vitality,
        luck: output.fight.attacker.stats.luck,
        agility: output.fight.attacker.stats.agility,
        level: output.fight.attacker.levelingSystem.level,
        victories: output.fight.attacker.levelingSystem.victories,
        defeats: output.fight.attacker.levelingSystem.defeats,
        xp: output.fight.attacker.levelingSystem.xp,
      },
      defender: {
        id: output.fight.defender.id,
        name: output.fight.defender.name,
        hp: output.fight.defender.healthSystem.hp,
        maxHp: output.fight.defender.healthSystem.maxHp,
        strength: output.fight.defender.stats.strength,
        dexterity: output.fight.defender.stats.dexterity,
        vitality: output.fight.defender.stats.vitality,
        luck: output.fight.defender.stats.luck,
        agility: output.fight.defender.stats.agility,
        level: output.fight.defender.levelingSystem.level,
        victories: output.fight.defender.levelingSystem.victories,
        defeats: output.fight.defender.levelingSystem.defeats,
        xp: output.fight.defender.levelingSystem.xp,
      },
      winner: {
        id: output.fight.winner.id,
        name: output.fight.winner.name,
        hp: output.fight.winner.healthSystem.hp,
        maxHp: output.fight.winner.healthSystem.maxHp,
        strength: output.fight.winner.stats.strength,
        dexterity: output.fight.winner.stats.dexterity,
        vitality: output.fight.winner.stats.vitality,
        luck: output.fight.winner.stats.luck,
        agility: output.fight.winner.stats.agility,
        level: output.fight.winner.levelingSystem.level,
        victories: output.fight.winner.levelingSystem.victories,
        defeats: output.fight.winner.levelingSystem.defeats,
        xp: output.fight.winner.levelingSystem.xp,
      },
      looser: {
        id: output.fight.looser.id,
        name: output.fight.looser.name,
        hp: output.fight.looser.healthSystem.hp,
        maxHp: output.fight.looser.healthSystem.maxHp,
        strength: output.fight.looser.stats.strength,
        dexterity: output.fight.looser.stats.dexterity,
        vitality: output.fight.looser.stats.vitality,
        luck: output.fight.looser.stats.luck,
        agility: output.fight.looser.stats.agility,
        level: output.fight.looser.levelingSystem.level,
        victories: output.fight.looser.levelingSystem.victories,
        defeats: output.fight.looser.levelingSystem.defeats,
        xp: output.fight.looser.levelingSystem.xp,
      },
      expGained: output.fight.xpGained,
      steps: output.fight.steps.map((step) => ({
        action: step.action,
        attacker: {
          id: step.attacker.id,
          name: step.attacker.name,
          hp: step.attacker.healthSystem.hp,
          maxHp: step.attacker.healthSystem.maxHp,
          strength: step.attacker.stats.strength,
          dexterity: step.attacker.stats.dexterity,
          vitality: step.attacker.stats.vitality,
          luck: step.attacker.stats.luck,
          agility: step.attacker.stats.agility,
          level: step.attacker.levelingSystem.level,
          victories: step.attacker.levelingSystem.victories,
          defeats: step.attacker.levelingSystem.defeats,
          xp: step.attacker.levelingSystem.xp,
        },
        defender: {
          id: step.defender.id,
          name: step.defender.name,
          hp: step.defender.healthSystem.hp,
          maxHp: step.defender.healthSystem.maxHp,
          strength: step.defender.stats.strength,
          dexterity: step.defender.stats.dexterity,
          vitality: step.defender.stats.vitality,
          luck: step.defender.stats.luck,
          agility: step.defender.stats.agility,
          level: step.defender.levelingSystem.level,
          victories: step.defender.levelingSystem.victories,
          defeats: step.defender.levelingSystem.defeats,
          xp: step.defender.levelingSystem.xp,
        },
        damageDealt: step.damageDealt,
        description: step.description,
      })),
    };
  }
}
