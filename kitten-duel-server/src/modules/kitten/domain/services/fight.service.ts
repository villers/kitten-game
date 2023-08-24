import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';
import { SkillRegistry } from '../skills/skill.registry';

export class FightService {
  constructor(private skillRegistry: SkillRegistry) {}
  performOneRound(attacker: Kitten, defender: Kitten): FightStep[] {
    let steps: FightStep[] = [];

    // First kitten attacks second kitten
    steps = steps.concat(this.performAttackWithSkills(attacker, defender));

    // Second kitten attacks first kitten
    steps = steps.concat(this.performAttackWithSkills(defender, attacker));

    return steps;
  }

  performAttackWithSkills(attacker: Kitten, defender: Kitten): FightStep[] {
    const steps: FightStep[] = [];

    // Check if the attacker is distracted
    if (attacker.hasBuff('Distracted')) {
      steps.push(
        new FightStep(
          attacker,
          defender,
          'distract',
          0,
          'Le chaton est distrait et saute son tour!',
        ),
      );
      return steps;
    }

    const availableSkills = this.skillRegistry.getAll();

    // Check if any of the skills are active and execute them
    for (const skill of availableSkills) {
      if (skill.isActive(attacker, defender)) {
        steps.push(skill.execute(attacker, defender));
      }
    }

    // If no skills were activated, perform a regular attack
    if (steps.length === 0) {
      steps.push(this.performAttack(attacker, defender));
    }

    return steps;
  }

  performAttack(attacker: Kitten, defender: Kitten): FightStep {
    const hitChance = Math.random() * 100;
    const dodgeChance = Math.random() * 100;
    const criticalChance = Math.random() * 100;

    if (
      hitChance <= attacker.getHitChance() &&
      dodgeChance > defender.getDodgeChance()
    ) {
      const isCritical = criticalChance <= attacker.getCriticalChance();
      const damage = isCritical
        ? attacker.getAttackPower() * 1.5
        : attacker.getAttackPower();
      defender.hp -= damage;
      return new FightStep(
        attacker,
        defender,
        isCritical ? 'coup critique' : 'attaque',
        damage,
        isCritical ? 'Coup critique!' : 'Attaque réussie!',
      );
    } else if (dodgeChance <= defender.getDodgeChance()) {
      return new FightStep(
        attacker,
        defender,
        'esquive',
        0,
        'Esquive réussie!',
      );
    } else {
      return new FightStep(attacker, defender, 'raté', 0, 'Attaque manquée!');
    }
  }
}
