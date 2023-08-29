import { Distract } from './distract';
import { BuffService } from '../services/buff.service';
import { RandomService } from '../services/random.service';
import { FightStep } from '../entities/fight.entity';
import { mock, Mock } from 'ts-jest-mocker';
import { Kitten } from '../entities/kitten.entity';
import { SkillArgs } from './skill.interface';
import { Buff } from '../entities/buff.entity';

jest.mock('../services/buff.service');
jest.mock('../services/random.service');

describe('Distract', () => {
  let distract: Distract;
  let buffService: Mock<BuffService>;
  let randomService: Mock<RandomService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    buffService = mock(BuffService);
    randomService = mock(RandomService);
    distract = new Distract(buffService, randomService);
    skillArgs = {
      attacker: mock(Kitten),
      defender: mock(Kitten),
    };
  });

  describe('isActive', () => {
    it('should return true if the defender is not distracted and random number is below activation chance', () => {
      buffService.getBuffsForKitten.mockReturnValue([]);
      randomService.numberBelow.mockReturnValue(5);
      expect(distract.isActive(skillArgs)).toBe(true);
    });

    it('should return false if the defender is already distracted', () => {
      buffService.getBuffsForKitten.mockReturnValue([mock(Buff)]);
      expect(distract.isActive(skillArgs)).toBe(false);
    });

    it('should return false if the random number is above activation chance', () => {
      buffService.getBuffsForKitten.mockReturnValue([]);
      randomService.numberBelow.mockReturnValue(15);
      expect(distract.isActive(skillArgs)).toBe(false);
    });
  });

  describe('execute', () => {
    it('should apply the distracted buff to the defender and return a fight step', () => {
      const fightStep = distract.execute(skillArgs);
      expect(buffService.applyBuff).toHaveBeenCalledWith(skillArgs.defender, {
        name: 'Distracted',
        duration: 1,
        effect: null,
      });
      expect(fightStep).toBeInstanceOf(FightStep);
    });
  });
});
