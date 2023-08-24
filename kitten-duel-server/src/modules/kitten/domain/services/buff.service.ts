// buff.service.ts

import { Kitten } from '../entities/kitten.entity';

export class Buff {
  constructor(
    public name: string,
    public duration: number,
    public effect: any,
  ) {}
}

export class BuffService {
  private activeBuffs: Map<Kitten, Buff[]> = new Map();

  applyBuff(kitten: Kitten, buff: Buff) {
    if (!this.activeBuffs.has(kitten)) {
      this.activeBuffs.set(kitten, []);
    }

    this.activeBuffs.get(kitten).push(buff);
  }

  removeBuff(kitten: Kitten, buffName: string) {
    const buffs = this.activeBuffs.get(kitten) || [];
    this.activeBuffs.set(
      kitten,
      buffs.filter((b) => b.name !== buffName),
    );
  }

  getBuffsForKitten(kitten: Kitten): Buff[] {
    return this.activeBuffs.get(kitten) || [];
  }

  // ... (autres méthodes, comme la mise à jour de la durée des buffs, etc.)
}
