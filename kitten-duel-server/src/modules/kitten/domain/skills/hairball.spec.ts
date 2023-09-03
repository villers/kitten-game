import { Hairball } from './hairball';
import { RandomService } from '../services/random.service';
import { mock, Mock } from 'ts-jest-mocker';
import { Kitten } from '../entities/kitten.entity';
import { HealthSystem } from '../entities/health-system.entity';
import { Stats } from '../entities/stats.entity';
import { SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight-step.entity';

jest.mock('../services/random.service');

describe('Hairball', () => {
  let hairball: Hairball;
  let randomService: Mock<RandomService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    hairball = new Hairball(randomService);
    skillArgs = {
      attacker: mock<Kitten>(),
      defender: mock<Kitten>(),
    };
    skillArgs.attacker.stats = new Stats({ strength: 10, luck: 10 });
    skillArgs.defender.healthSystem = new HealthSystem(10);
  });

  describe('isActive', () => {
    it('should return true if random number is below activation chance', () => {
      randomService.numberBelow.mockReturnValue(10);
      expect(hairball.isActive(skillArgs)).toBe(true);
    });

    it('should return false if random number is above activation chance', () => {
      randomService.numberBelow.mockReturnValue(20);
      expect(hairball.isActive(skillArgs)).toBe(false);
    });
  });

  describe('execute', () => {
    it('should deal damage to the defender and return a fight step', () => {
      const initialHp = skillArgs.defender.healthSystem.hp;
      const fightStep = hairball.execute(skillArgs);
      expect(skillArgs.defender.healthSystem.hp).toBeLessThan(initialHp);
      expect(fightStep).toBeInstanceOf(FightStep);
    });
  });
});
