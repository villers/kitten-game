import { Inject, Injectable } from '@nestjs/common';
import { Duel, DuelStep } from '../../domain/entities/duel.entity';
import { Kitten } from '../../domain/entities/kitten.entity';
import { Equipment } from '../../domain/entities/equipment.entity';
import { IDuelRepository } from '../../domain/repositories/iduel-repository';
import { IEquipmentRepository } from '../../domain/repositories/iequipment-repository';

@Injectable()
export class DuelService {
  constructor(
    @Inject('IEquipmentRepository')
    private equipmentService: IEquipmentRepository,
    @Inject('IDuelRepository')
    private duelRepository: IDuelRepository,
  ) {}

  async organizeDuel(duel: Duel): Promise<void> {
    // You can add additional logic here, like validating the duel details
    await this.duelRepository.save(duel);
  }

  async getDuelById(id: string): Promise<Duel | null> {
    return await this.duelRepository.findById(id);
  }

  async updateDuel(duel: Duel): Promise<void> {
    await this.duelRepository.update(duel);
  }

  async fight(kittenA: Kitten, kittenB: Kitten): Promise<Duel> {
    // work on a copy of the kittens to avoid modifying the original kittens
    kittenA = { ...kittenA };
    kittenB = { ...kittenB };

    const initialAttacker = this.determineInitialAttacker(kittenA, kittenB);
    const initialDefender = initialAttacker === kittenA ? kittenB : kittenA;

    let currentAttacker = initialAttacker;
    let currentDefender = initialDefender;

    const duel: Duel = new Duel();
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

    return duel;
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
  ): Promise<DuelStep> {
    const equipmentPower = await this.calculateEquipmentPower(
      attacker.equipmentIds,
    );

    // Calculate total attack power with variability
    const baseAttackPower = attacker.power + equipmentPower;
    const variability = (baseAttackPower * (Math.random() - 0.5)) / 2;
    const totalAttackPower = baseAttackPower + variability;

    // Ensure damage isn't negative and factor in defender's defense
    const defenseVariability = Math.random() * 5; // Random defense variability between 0 and 5
    const damageToDefender = Math.max(
      totalAttackPower - defender.defense - defenseVariability,
      0,
    );
    defender.hp -= damageToDefender;

    return {
      attackerId: attacker.id,
      defenderId: defender.id,
      attackPower: totalAttackPower,
      attackerHp: attacker.hp,
      defenderHp: defender.hp,
    };
  }

  private async calculateEquipmentPower(
    equipmentIds: string[],
  ): Promise<number> {
    let totalPower = 0;
    for (const id of equipmentIds) {
      const equipment: Equipment = await this.equipmentService.findById(id);
      if (equipment) {
        totalPower += equipment.powerBoost;
      }
    }
    return totalPower;
  }

  private async calculateEquipmentDefense(
    equipmentIds: string[],
  ): Promise<number> {
    let totalDefense = 0;
    for (const id of equipmentIds) {
      const equipment: Equipment = await this.equipmentService.findById(id);
      if (equipment && equipment.defenseBoost) {
        totalDefense += equipment.defenseBoost;
      }
    }
    return totalDefense;
  }
}
