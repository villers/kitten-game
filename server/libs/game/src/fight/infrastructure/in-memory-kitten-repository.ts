import { FightRepository } from '@game/game/fight/application/fight.repository';
import { Fight } from '../domain/fight';

export class InMemoryFightRepository implements FightRepository {
  private autoincrement = 1;
  private fights = new Map<number, Fight>();

  async create(fight: Fight): Promise<Fight> {
    if (!fight.id) {
      fight.id = this.autoincrement++;
    }

    this.save(fight);
    return Promise.resolve(
      Fight.fromData({
        id: fight.id,
        attacker: fight.attacker,
        defender: fight.defender,
      }),
    );
  }
  findByName(name: string): Promise<Fight> {
    throw new Error('Method not implemented.');
  }
  nameExist(name: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private save(fight: Fight) {
    this.fights.set(fight.id, fight);
  }
}
