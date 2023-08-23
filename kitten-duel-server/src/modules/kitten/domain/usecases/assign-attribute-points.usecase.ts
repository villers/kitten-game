import { KittenRepository } from '../repositories/kitten.repository';
import { Kitten } from '../entities/kitten.entity';
import { KittenNotFoundException } from '../exceptions/KittenNotFoundException';
import { KittenAddAttributePointsException } from '../exceptions/KittenAddAttributePointsException';

export type AssignAttributePointsInput = {
  vitality: number;
  agility: number;
  dexterity: number;
  force: number;
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
      assignData.force +
      assignData.luck;

    if (nbPoints > kitten.availableAttributePoints) {
      throw new KittenAddAttributePointsException(kittenId);
    }

    // Assigning the attribute points
    kitten.vitality += assignData.vitality;
    kitten.agility += assignData.agility;
    kitten.dexterity += assignData.dexterity;
    kitten.force += assignData.force;
    kitten.luck += assignData.luck;
    kitten.availableAttributePoints -= nbPoints;

    await this.kittenRepository.save(kitten);

    return {
      player: kitten,
    };
  }
}
