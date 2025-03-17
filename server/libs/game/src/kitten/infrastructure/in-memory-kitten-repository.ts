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
        skills: kitten.skills,
        status: kitten.status,
        equipment: kitten.equipment,
        attributes: kitten.attributes,
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
