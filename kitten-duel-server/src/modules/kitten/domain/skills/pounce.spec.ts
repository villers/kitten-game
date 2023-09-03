import { Pounce } from './pounce';
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

describe('Pounce', () => {
  let pounce: Pounce;
  let randomService: Mock<RandomService>;
  let buffService: Mock<BuffService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    buffService = mock(BuffService);
    pounce = new Pounce(buffService, randomService);
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
    it('should return true if random number is below activation chance and attacker does not have GriffesAcerées buff', () => {
      randomService.numberBelow.mockReturnValue(10);
      buffService.getBuffsForKitten.mockReturnValue([]);
      expect(pounce.isActive(skillArgs)).toBe(true);
    });

    it('should return false if random number is above activation chance', () => {
      randomService.numberBelow.mockReturnValue(20);
      expect(pounce.isActive(skillArgs)).toBe(false);
    });

    it('should return false if attacker has GriffesAcerées buff', () => {
      randomService.numberBelow.mockReturnValue(10);
      buffService.getBuffsForKitten.mockReturnValue([
        { name: 'GriffesAcerées', duration: 1, effect: null },
      ]);
      expect(pounce.isActive(skillArgs)).toBe(false);
    });

    describe('execute', () => {
      it('should deal damage to the defender and return a fight step', () => {
        const initialHp = skillArgs.defender.healthSystem.hp;
        const fightStep = pounce.execute(skillArgs);
        expect(skillArgs.defender.healthSystem.hp).toBeLessThan(initialHp);
        expect(fightStep).toBeInstanceOf(FightStep);
      });
    });
  });
});
