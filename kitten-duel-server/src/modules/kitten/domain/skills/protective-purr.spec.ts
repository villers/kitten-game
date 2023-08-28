import { ProtectivePurr } from './protective-purr';
import { RandomService } from '../services/random.service';
import { BuffService } from '../services/buff.service';
import { FightStep } from '../entities/fight.entity';
import { mock, Mock } from 'ts-jest-mocker';
import { Kitten } from '../entities/kitten.entity';
import { Stats } from '../entities/stats.entity';
import { SkillArgs } from './skill.interface';
import { HealthSystem } from '../entities/health-system.entity';
import { LevelingSystem } from '../entities/leveling-system.entity';

jest.mock('../services/random.service');
jest.mock('../services/buff.service');

describe('ProtectivePurr', () => {
  let protectivePurr: ProtectivePurr;
  let randomService: Mock<RandomService>;
  let buffService: Mock<BuffService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    buffService = mock(BuffService);
    protectivePurr = new ProtectivePurr(buffService, randomService);
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
    it('should return true if random number is below activation chance', () => {
      randomService.numberBelow.mockReturnValue(10);
      expect(protectivePurr.isActive(skillArgs)).toBe(true);
    });

    it('should return false if random number is above activation chance', () => {
      randomService.numberBelow.mockReturnValue(30);
      expect(protectivePurr.isActive(skillArgs)).toBe(false);
    });
  });

  describe('execute', () => {
    it('should apply protection buff to the attacker and return a fight step', () => {
      const fightStep = protectivePurr.execute(skillArgs);
      expect(buffService.applyBuff).toHaveBeenCalledWith(skillArgs.attacker, {
        name: 'Protection',
        duration: 3,
        effect: {
          type: 'reduceDefense',
          value: -0.3 * skillArgs.defender.stats.getDefensePower(),
        },
      });
      expect(fightStep).toBeInstanceOf(FightStep);
    });
  });
});
