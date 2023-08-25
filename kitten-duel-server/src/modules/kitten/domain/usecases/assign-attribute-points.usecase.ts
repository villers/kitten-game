import { KittenRepository } from '../repositories/kitten.repository';
import { Kitten } from '../entities/kitten.entity';
import { KittenNotFoundException } from '../exceptions/KittenNotFoundException';
import { KittenAddAttributePointsException } from '../exceptions/KittenAddAttributePointsException';

export type AssignAttributePointsInput = {
  vitality: number;
  agility: number;
  dexterity: number;
  strength: number;
  luck: number;
};

export type AssignAttributePointsOutput = {
  player: Kitten;
};

export class AssignAttributePointsUsecase {
  constructor(private readonly kittenRepository: KittenRepository) {}

  async execute(
    kittenId: string,
    assignData: AssignAttributePointsInput,
  ): Promise<AssignAttributePointsOutput> {
    const kitten = await this.kittenRepository.findById(kittenId);
    if (!kitten) {
      throw new KittenNotFoundException(kittenId);
    }

    const nbPoints =
      assignData.vitality +
      assignData.agility +
      assignData.dexterity +
      assignData.strength +
      assignData.luck;

    if (nbPoints > kitten.levelingSystem.availableAttributePoints) {
      throw new KittenAddAttributePointsException(kittenId);
    }

    // Assigning the attribute points
    kitten.stats.vitality += assignData.vitality;
    kitten.stats.agility += assignData.agility;
    kitten.stats.dexterity += assignData.dexterity;
    kitten.stats.strength += assignData.strength;
    kitten.stats.luck += assignData.luck;
    kitten.levelingSystem.availableAttributePoints -= nbPoints;

    await this.kittenRepository.save(kitten);

    return {
      player: kitten,
    };
  }
}
