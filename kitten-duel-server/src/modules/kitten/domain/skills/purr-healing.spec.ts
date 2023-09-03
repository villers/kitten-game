import { PurrHealing } from './purr-healing';
import { RandomService } from '../services/random.service';
import { mock, Mock } from 'ts-jest-mocker';
import { Kitten } from '../entities/kitten.entity';
import { HealthSystem } from '../entities/health-system.entity';
import { Stats } from '../entities/stats.entity';
import { SkillArgs } from './skill.interface';
import { LevelingSystem } from '../entities/leveling-system.entity';
import { FightStep } from '../entities/fight-step.entity';

jest.mock('../services/random.service');

describe('PurrHealing', () => {
  let purrHealing: PurrHealing;
  let randomService: Mock<RandomService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    purrHealing = new PurrHealing(randomService);
    skillArgs = {
      attacker: new Kitten({
        stats: new Stats({ strength: 10, luck: 10, vitality: 10 }),
        healthSystem: new HealthSystem(10),
        levelingSystem: new LevelingSystem(),
      }),
      defender: new Kitten({
        stats: new Stats({ strength: 10, luck: 10, vitality: 10 }),
        healthSystem: new HealthSystem(10),
        levelingSystem: new LevelingSystem(),
      }),
    };
  });

  describe('isActive', () => {
    it('should return true if random number is below activation chance and attacker HP is below 50% of maxHP', () => {
      randomService.numberBelow.mockReturnValue(10);
      skillArgs.attacker.healthSystem.hp = 5; // set HP to 50% of maxHP
      expect(purrHealing.isActive(skillArgs)).toBe(true);
    });

    it('should return false if random number is above activation chance', () => {
      randomService.numberBelow.mockReturnValue(30);
      skillArgs.attacker.healthSystem.hp = 5; // set HP to 50% of maxHP
      expect(purrHealing.isActive(skillArgs)).toBe(false);
    });

    it('should return false if attacker HP is above 50% of maxHP', () => {
      randomService.numberBelow.mockReturnValue(10);
      skillArgs.attacker.healthSystem.hp = 60; // set HP to 60% of maxHP
      expect(purrHealing.isActive(skillArgs)).toBe(false);
    });
  });

  describe('execute', () => {
    it('should heal the attacker and return a fight step', () => {
      const initialHp = skillArgs.attacker.healthSystem.hp;
      const fightStep = purrHealing.execute(skillArgs);
      expect(skillArgs.attacker.healthSystem.hp).toBeGreaterThan(initialHp);
      expect(fightStep).toBeInstanceOf(FightStep);
    });
  });
});
