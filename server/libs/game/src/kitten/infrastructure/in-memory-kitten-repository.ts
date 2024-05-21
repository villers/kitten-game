import { KittenRepository } from '@game/game/kitten/application/kitten.repository';
import { Kitten } from '@game/game/kitten/domain/kitten';

export class InMemoryKittenRepository implements KittenRepository {
  private autoincrement = 1;
  private kittens = new Map<number, Kitten>();

  async create(kitten: Kitten): Promise<Kitten> {
    if (!kitten.id) {
      kitten.id = this.autoincrement++;
    }

    this.save(kitten);
    return Promise.resolve(
      Kitten.fromData({
        id: kitten.id,
        name: kitten.name,
        user: kitten.user,
        level: kitten.level,
        xp: kitten.xp,
        initiative: kitten.initiative,
        enduranceValue: kitten.endurance.value,
        enduranceModifier: kitten.endurance.modifier,
        strengthValue: kitten.strength.value,
        strengthModifier: kitten.strength.modifier,
        agilityValue: kitten.agility.value,
        agilityModifier: kitten.agility.modifier,
        speedValue: kitten.speed.value,
        speedModifier: kitten.speed.modifier,
        skills: kitten.skills,
        weapons: kitten.weapons,
        activeSkills: kitten.activeSkills,
        activeWeapon: kitten.activeWeapon,
      }),
    );
  }

  findByName(name: string): Promise<Kitten> {
    const kitten = [...this.kittens.values()].find((u) => u.name === name);
    return Promise.resolve(kitten);
  }

  nameExist(name: string): Promise<boolean> {
    return Promise.resolve(
      [...this.kittens.values()].some((k) => k.name === name),
    );
  }

  async findById(id: number): Promise<Kitten> {
    return Promise.resolve(this.kittens.get(id));
  }

  givenExistingKittens(kittens: Kitten[]) {
    kittens.forEach(this.save.bind(this));
  }

  private save(kitten: Kitten) {
    this.kittens.set(kitten.id, kitten);
  }
}
