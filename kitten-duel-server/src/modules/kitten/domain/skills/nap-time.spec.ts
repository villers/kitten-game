import { NapTime } from './nap-time';
import { RandomService } from '../services/random.service';
import { mock, Mock } from 'ts-jest-mocker';
import { Kitten } from '../entities/kitten.entity';
import { HealthSystem } from '../entities/health-system.entity';
import { Stats } from '../entities/stats.entity';
import { SkillArgs } from './skill.interface';
import { FightStep } from '../entities/fight-step.entity';

jest.mock('../services/random.service');

describe('NapTime', () => {
  let napTime: NapTime;
  let randomService: Mock<RandomService>;
  let skillArgs: SkillArgs;

  beforeEach(() => {
    randomService = mock(RandomService);
    napTime = new NapTime(randomService);
    skillArgs = {
      attacker: mock<Kitten>(),
      defender: mock<Kitten>(),
    };
    skillArgs.attacker.healthSystem = new HealthSystem(10);
    skillArgs.defender.healthSystem = new HealthSystem(10);
    skillArgs.attacker.stats = new Stats({ strength: 10, luck: 10 });
  });

  describe('isActive', () => {
    it('should return true if attacker HP is not full and random number is below activation chance', () => {
      skillArgs.attacker.healthSystem.hp = 8; // set HP to 80% of maxHP
      randomService.numberBelow.mockReturnValue(10); // 10% chance
      expect(napTime.isActive(skillArgs)).toBe(true);
    });

    it('should return false if attacker HP is full', () => {
      skillArgs.attacker.healthSystem.hp =
        skillArgs.attacker.healthSystem.maxHp;
      randomService.numberBelow.mockReturnValue(10); // 10% chance
      expect(napTime.isActive(skillArgs)).toBe(false);
    });

    it('should return false if random number is above activation chance', () => {
      skillArgs.attacker.healthSystem.hp = 8; // set HP to 80% of maxHP
      randomService.numberBelow.mockReturnValue(30); // 30% chance
      expect(napTime.isActive(skillArgs)).toBe(false);
    });
  });

  describe('execute', () => {
    it('should heal the attacker and return a fight step', () => {
      const initialHp = skillArgs.attacker.healthSystem.hp;
      const fightStep = napTime.execute(skillArgs);
      expect(skillArgs.attacker.healthSystem.hp).toBeGreaterThan(initialHp);
      expect(fightStep).toBeInstanceOf(FightStep);
    });
  });
});
