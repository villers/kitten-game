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
    const kittenA = {
      ...(await this.kittenRepository.findById(inputs.kittenAId)),
    };
    const kittenB = {
      ...(await this.kittenRepository.findById(inputs.kittenBId)),
    };

    const initialAttacker = this.determineInitialAttacker(kittenA, kittenB);
    const initialDefender = initialAttacker === kittenA ? kittenB : kittenA;

    let currentAttacker = initialAttacker;
    let currentDefender = initialDefender;

    const duel: FightEntity = new FightEntity();
    duel.kitten1Id = kittenA.id;
    duel.kitten2Id = kittenB.id;
    duel.kitten1InitialHp = kittenA.hp;
    duel.kitten2InitialHp = kittenB.hp;
    duel.steps = [];

    while (kittenA.hp > 0 && kittenB.hp > 0) {
      const attackDetail = await this.performAttack(
        currentAttacker,
        currentDefender,
      );
      duel.steps.push(attackDetail);
      [currentAttacker, currentDefender] = [currentDefender, currentAttacker]; // Swap attacker and defender roles
    }

    duel.winnerId = kittenA.hp > 0 ? kittenA.id : kittenB.id;
    duel.kitten1RemainingHp = kittenA.hp;
    duel.kitten2RemainingHp = kittenB.hp;

    await this.fightRepository.save(duel);

    return {
      fight: duel,
    };
  }

  private determineInitialAttacker(kittenA: Kitten, kittenB: Kitten): Kitten {
    const speedFactor = Math.random();
    if (kittenA.speed > kittenB.speed || speedFactor > 0.8) {
      return kittenA;
    }
    return kittenB;
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
      attackerId: attacker.id,
      defenderId: defender.id,
      attackPower: totalAttackPower,
      attackerHp: attacker.hp,
      defenderHp: defender.hp,
    };
  }

  private calculateEquipmentPower(equipments: Equipment[]): number {
    return equipments.reduce(
      (total, equipment) => total + (equipment.powerBoost || 0),
      0,
    );
  }

  private calculateEquipmentDefense(equipments: Equipment[]): number {
    return equipments.reduce(
      (total, equipment) => total + (equipment.defenseBoost || 0),
      0,
    );
  }
}
