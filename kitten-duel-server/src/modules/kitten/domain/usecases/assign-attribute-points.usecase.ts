import { KittenRepository } from '../repositories/kitten.repository';
import { Kitten } from '../entities/kitten.entity';
import { KittenNotFoundException } from '../exceptions/KittenNotFoundException';
import { KittenAddAttributePointsException } from '../exceptions/KittenAddAttributePointsException';

export type AssignAttributePointsInput = {
  hpPoints: number; // Points to be added to HP
  powerPoints: number; // Points to be added to Power
  defensePoints: number; // Points to be added to Defense
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
      assignData.hpPoints + assignData.powerPoints + assignData.defensePoints;

    if (nbPoints > kitten.availableAttributePoints) {
      throw new KittenAddAttributePointsException(kittenId);
    }

    // Assigning the attribute points
    kitten.hp += assignData.hpPoints;
    kitten.power += assignData.powerPoints;
    kitten.defense += assignData.defensePoints;
    kitten.availableAttributePoints -= nbPoints;

    await this.kittenRepository.save(kitten);

    return {
      player: kitten,
    };
  }
}
