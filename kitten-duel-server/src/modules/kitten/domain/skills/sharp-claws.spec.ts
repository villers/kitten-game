import { SharpClaws } from './sharp-claws';
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

describe('SharpClaws', () => {
  let sharpClaws: SharpClaws;
  let randomService: Mock<RandomService>;
  let buffService: Mock<BuffService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    buffService = mock(BuffService);
    sharpClaws = new SharpClaws(buffService, randomService);
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
    it('should return true if random number is below activation chance', () => {
      randomService.numberBelow.mockReturnValue(5);
      expect(sharpClaws.isActive(skillArgs)).toBe(true);
    });

    it('should return false if random number is above activation chance', () => {
      randomService.numberBelow.mockReturnValue(20);
      expect(sharpClaws.isActive(skillArgs)).toBe(false);
    });

    describe('execute', () => {
      it('should apply SharpClaws buff to the attacker and return a fight step', () => {
        const fightStep = sharpClaws.execute(skillArgs);
        expect(buffService.applyBuff).toHaveBeenCalledWith(skillArgs.attacker, {
          name: 'GriffesAcerées',
          duration: 3,
          effect: {
            type: 'increaseAttack',
            value: 0.5 * skillArgs.attacker.stats.getAttackPower(),
          },
        });
        expect(fightStep).toBeInstanceOf(FightStep);
      });
    });
  });
});
