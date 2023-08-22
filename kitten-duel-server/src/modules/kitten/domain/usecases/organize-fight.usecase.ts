import { FightEntity, FightStep } from '../entities/fight.entity';
import { Kitten } from '../entities/kitten.entity';
import { Equipment } from '../entities/equipment.entity';
import { FightRepository } from '../repositories/fight.repository';
import { EquipmentRepository } from '../repositories/equipment.repository';
import { KittenRepository } from '../repositories/kitten.repository';

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
    const originalKittenA = await this.kittenRepository.findById(
      inputs.kittenAId,
    );
    const originalKittenB = await this.kittenRepository.findById(
      inputs.kittenBId,
    );

    const duel = this.initializeDuel(originalKittenA, originalKittenB);

    let attacker = new Kitten(originalKittenA);
    let defender = new Kitten(originalKittenB);

    while (attacker.isAlive() && defender.isAlive()) {
      const attackDetail = await this.performAttack(attacker, defender);
      duel.steps.push(attackDetail);
      [attacker, defender] = [defender, attacker]; // Swap roles
    }

    this.finalizeDuelAndUpdateKittens(
      duel,
      originalKittenA,
      originalKittenB,
      attacker,
      defender,
    );

    await this.fightRepository.save(duel);
    await this.kittenRepository.save(originalKittenA);
    await this.kittenRepository.save(originalKittenB);

    return { fight: duel };
  }

  private initializeDuel(kittenA: Kitten, kittenB: Kitten): FightEntity {
    const duel = new FightEntity();
    duel.kitten1 = kittenA;
    duel.kitten2 = kittenB;
    duel.steps = [];
    return duel;
  }

  private finalizeDuelAndUpdateKittens(
    duel: FightEntity,
    kittenA: Kitten,
    kittenB: Kitten,
    attacker: Kitten,
    defender: Kitten,
  ): void {
    const winnerKitten = attacker.isAlive() ? attacker : defender;
    const looserKitten = attacker.isAlive() ? defender : attacker;

    duel.winner = winnerKitten;
    duel.looser = looserKitten;

    const winner = winnerKitten.id === kittenA.id ? kittenA : kittenB;
    const looser = winnerKitten.id === kittenA.id ? kittenB : kittenA;

    winner.victories = (winner.victories || 0) + 1;
    looser.defeats = (looser.defeats || 0) + 1;

    const xpGained = this.calculateXpGained(winner.level, looser.level);
    winner.xp += xpGained;
    this.checkForLevelUpAndAssignPoints(winner);
  }

  private async performAttack(
    attacker: Kitten,
    defender: Kitten,
  ): Promise<FightStep> {
    const attackerEquipments = await this.equipmentService.findByIds(
      attacker.equipmentIds,
    );
    const defenderEquipments = await this.equipmentService.findByIds(
      defender.equipmentIds,
    );
    const attackerEquipmentPower =
      this.calculateEquipmentPower(attackerEquipments);
    const defenderEquipmentDefense =
      this.calculateEquipmentDefense(defenderEquipments);

    // Calculate total attack power with variability
    const baseAttackPower = attacker.power + attackerEquipmentPower;
    const variability = (baseAttackPower * (Math.random() - 0.5)) / 2;
    const totalAttackPower = baseAttackPower + variability;

    // Ensure damage isn't negative and factor in defender's intrinsic and equipment defense
    const totalDefense = defender.defense + defenderEquipmentDefense;
    const damageToDefender = Math.max(totalAttackPower - totalDefense, 0);
    defender.hp -= damageToDefender;

    return {
      attackPower: totalAttackPower,
      attacker: attacker,
      defender: defender,
    };
  }

  private checkForLevelUpAndAssignPoints(kitten: Kitten): void {
    const xpRequiredForNextLevel = kitten.level ** 2 * 100;
    if (kitten.xp >= xpRequiredForNextLevel) {
      kitten.level++;
      kitten.xp -= xpRequiredForNextLevel;
      kitten.availableAttributePoints += 5;
    }
  }

  private calculateEquipmentPower(equipments: Equipment[]): number {
    return equipments.reduce(
      (total, equipment) => total + (equipment.powerBoost || 0),
      0,
    );
  }

  private calculateXpGained(winnerLevel: number, loserLevel: number): number {
    const levelDifference = loserLevel - winnerLevel;
    const baseXp = 100;

    // XP multiplier based on level difference
    let multiplier: number;
    if (levelDifference >= 5) {
      multiplier = 1.5;
    } else if (levelDifference >= 3) {
      multiplier = 1.3;
    } else if (levelDifference >= 1) {
      multiplier = 1.1;
    } else if (levelDifference === 0) {
      multiplier = 1.0;
    } else if (levelDifference <= -1) {
      multiplier = 0.9;
    } else if (levelDifference <= -3) {
      multiplier = 0.7;
    } else {
      multiplier = 0.5;
    }

    return baseXp * multiplier;
  }

  private calculateEquipmentDefense(equipments: Equipment[]): number {
    return equipments.reduce(
      (total, equipment) => total + (equipment.defenseBoost || 0),
      0,
    );
  }
}
