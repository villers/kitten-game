import { MysticalMeow } from './mystical-meow';
import { RandomService } from '../services/random.service';
import { BuffService } from '../services/buff.service';
import { mock, Mock } from 'ts-jest-mocker';
import { Kitten } from '../entities/kitten.entity';
import { Stats } from '../entities/stats.entity';
import { SkillArgs } from './skill.interface';
import { HealthSystem } from '../entities/health-system.entity';
import { LevelingSystem } from '../entities/leveling-system.entity';
import { FightStep } from '../entities/fight-step.entity';

jest.mock('../services/random.service');
jest.mock('../services/buff.service');

describe('MysticalMeow', () => {
  let mysticalMeow: MysticalMeow;
  let randomService: Mock<RandomService>;
  let buffService: Mock<BuffService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    buffService = mock(BuffService);
    mysticalMeow = new MysticalMeow(buffService, randomService);
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
      randomService.numberBelow.mockReturnValue(10);
      expect(mysticalMeow.isActive(skillArgs)).toBe(true);
    });

    it('should return false if random number is above activation chance', () => {
      randomService.numberBelow.mockReturnValue(20);
      expect(mysticalMeow.isActive(skillArgs)).toBe(false);
    });

    describe('execute', () => {
      it('should apply confused buff to the defender and return a fight step', () => {
        const fightStep = mysticalMeow.execute(skillArgs);
        expect(buffService.applyBuff).toHaveBeenCalledWith(skillArgs.defender, {
          name: 'Confused',
          duration: 2,
          effect: {
            type: 'reduceAttack',
            value: -0.5 * skillArgs.defender.stats.getAttackPower(),
          },
        });
        expect(fightStep).toBeInstanceOf(FightStep);
      });
    });
  });
});
