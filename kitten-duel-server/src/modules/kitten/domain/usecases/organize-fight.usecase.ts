import { EquipmentRepository } from '../repositories/equipment.repository';
import { FightRepository } from '../repositories/fight.repository';
import { KittenRepository } from '../repositories/kitten.repository';
import { FightEntity, FightStep } from '../entities/fight.entity';
import { Kitten } from '../entities/kitten.entity';
import { Pounce } from '../skills/pounce';
import { NapTime } from '../skills/nap-time';

const BASE_XP = 100;
const LEVEL_UP_ATTRIBUTE_POINTS = 5;

export type OrganizeFightInput = {
  kittenAId: string;
  kittenBId: string;
};

export type OrganizeFightOutput = {
  fight: FightEntity;
};

export class OrganizeFightUsecase {
  constructor(
    private equipmentService: EquipmentRepository,
    private fightRepository: FightRepository,
    private kittenRepository: KittenRepository,
  ) {}

  async execute(inputs: OrganizeFightInput): Promise<OrganizeFightOutput> {
    const [originalKittenA, originalKittenB] = await Promise.all([
      this.kittenRepository.findById(inputs.kittenAId),
      this.kittenRepository.findById(inputs.kittenBId),
    ]);

    const [attacker, defender] =
      originalKittenA.agility > originalKittenB.agility
        ? [new Kitten(originalKittenA), new Kitten(originalKittenB)]
        : [new Kitten(originalKittenB), new Kitten(originalKittenA)];

    const duel = new FightEntity({ kitten1: attacker, kitten2: defender });
    while (attacker.isAlive() && defender.isAlive()) {
      const attackDetails = await this.performAttackWithSkills(
        attacker,
        defender,
      );
      for (const attackDetail of attackDetails) {
        duel.addStep(
          attacker,
          defender,
          attackDetail.action,
          attackDetail.damageDealt,
          attackDetail.description,
        );
      }
    }

    duel.setOutcome(attacker, defender);

    const xpGained = this.calculateXpGained(
      duel.winner.level,
      duel.looser.level,
    );

    if (duel.winner.id === originalKittenA.id) {
      originalKittenA.victories += 1;
      originalKittenA.xp += xpGained;
      originalKittenB.defeats += 1;
      this.checkForLevelUpAndAssignPoints(originalKittenA);
    }
    if (duel.winner.id === originalKittenB.id) {
      originalKittenB.victories += 1;
      originalKittenB.xp += xpGained;
      originalKittenA.defeats += 1;
      this.checkForLevelUpAndAssignPoints(originalKittenB);
    }

    await Promise.all([
      this.fightRepository.save(duel),
      this.kittenRepository.save(originalKittenA),
      this.kittenRepository.save(originalKittenB),
    ]);

    return { fight: duel };
  }

  private async performAttackWithSkills(
    attacker: Kitten,
    defender: Kitten,
  ): Promise<FightStep[]> {
    const steps: FightStep[] = [];

    // Vérification de l'activation de la compétence Pounce
    if (Pounce.isActive()) {
      steps.push(Pounce.execute(attacker, defender));
    } else {
      steps.push(await this.performAttack(attacker, defender));
    }

    // Vérification de l'activation de la compétence NapTime pour le défenseur
    if (NapTime.isActive()) {
      steps.push(NapTime.execute(defender));
    }

    return steps;
  }

  private async performAttack(
    attacker: Kitten,
    defender: Kitten,
  ): Promise<FightStep> {
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

  private checkForLevelUpAndAssignPoints(kitten: Kitten): void {
    const xpRequiredForNextLevel = kitten.level ** 2 * BASE_XP;
    while (kitten.xp >= xpRequiredForNextLevel) {
      kitten.level++;
      kitten.xp -= xpRequiredForNextLevel;
      kitten.availableAttributePoints += LEVEL_UP_ATTRIBUTE_POINTS;
    }
  }

  private calculateXpGained(winnerLevel: number, loserLevel: number): number {
    return BASE_XP * this.getXpMultiplier(winnerLevel, loserLevel);
  }

  private getXpMultiplier(winnerLevel: number, loserLevel: number): number {
    const levelDifference = loserLevel - winnerLevel;

    if (levelDifference >= 5) return 1.5;
    if (levelDifference >= 3) return 1.3;
    if (levelDifference >= 1) return 1.1;
    if (levelDifference === 0) return 1.0;
    if (levelDifference <= -1) return 0.9;
    if (levelDifference <= -3) return 0.7;

    return 0.5;
  }
}
