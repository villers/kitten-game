import { Kitten } from '../entities/kitten.entity';

export class Buff {
  constructor(
    public name: string,
    public duration: number,
    public effect: BuffEffect, // Using a BuffEffect type
  ) {}
}

// Define a type or interface for BuffEffect
export type BuffEffect = {
  type: 'increaseAttack' | 'reduceDefense' | 'heal' | 'damage'; // Sample types
  value: number;
};

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

  // New method to update buff durations
  updateBuffDurations() {
    for (const [kitten, buffs] of this.activeBuffs.entries()) {
      for (const buff of buffs) {
        buff.duration--;
        if (buff.duration <= 0) {
          this.removeBuff(kitten, buff.name);
        }
      }
    }
  }
}
