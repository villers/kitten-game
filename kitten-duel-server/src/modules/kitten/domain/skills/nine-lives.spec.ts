import { NineLives } from './nine-lives';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight.entity';
import { Kitten } from '../entities/kitten.entity';
import { HealthSystem } from '../entities/health-system.entity';
import { Stats } from '../entities/stats.entity';
import { SkillArgs } from './skill.interface';
import { LevelingSystem } from '../entities/leveling-system.entity';
import { mock, Mock } from 'ts-jest-mocker';

jest.mock('../services/random.service');
jest.mock('../services/buff.service');

describe('NineLives', () => {
  let nineLives: NineLives;
  let randomService: Mock<RandomService>;
  let buffService: Mock<BuffService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    buffService = mock(BuffService);
    nineLives = new NineLives(buffService, randomService);
    skillArgs = {
      attacker: new Kitten({
        stats: new Stats({ strength: 10, luck: 10 }),
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
    it('should return true if random number is below or equal to 5, attacker HP is less than or equal to 10% of maxHP, and attacker does not have NineLives buff', () => {
      randomService.numberBelow.mockReturnValue(5);
      skillArgs.attacker.healthSystem.hp = 10;
      buffService.getBuffsForKitten.mockReturnValue([]);
      expect(nineLives.isActive(skillArgs)).toBe(true);
    });

    it('should return false if attacker has NineLives buff', () => {
      randomService.numberBelow.mockReturnValue(5);
      skillArgs.attacker.healthSystem.hp = 10;
      buffService.getBuffsForKitten.mockReturnValue([
        { name: 'NineLives', duration: 1, effect: null },
      ]);
      expect(nineLives.isActive(skillArgs)).toBe(false);
    });

    it('should return false if random number is above 5', () => {
      randomService.numberBelow.mockReturnValue(6);
      skillArgs.attacker.healthSystem.hp = 10;
      buffService.getBuffsForKitten.mockReturnValue([]);
      expect(nineLives.isActive(skillArgs)).toBe(false);
    });

    it('should return false if attacker HP is greater than 11% of maxHP', () => {
      randomService.numberBelow.mockReturnValue(5);
      skillArgs.attacker.healthSystem.hp = 11;
      buffService.getBuffsForKitten.mockReturnValue([]);
      expect(nineLives.isActive(skillArgs)).toBe(false);
    });
  });

  describe('execute', () => {
    it('should heal the attacker to 50% of maxHP, apply NineLives buff, and return a fight step', () => {
      const fightStep = nineLives.execute(skillArgs);
      expect(skillArgs.attacker.healthSystem.hp).toBe(
        skillArgs.attacker.healthSystem.maxHp * 0.5,
      );
      expect(buffService.applyBuff).toHaveBeenCalledWith(
        skillArgs.attacker,
        expect.objectContaining({ name: 'NineLives' }),
      );
      expect(fightStep).toBeInstanceOf(FightStep);
    });
  });
});
