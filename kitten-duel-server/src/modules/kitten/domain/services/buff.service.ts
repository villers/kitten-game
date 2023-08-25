import { Kitten } from '../entities/kitten.entity';

export class Buff {
  constructor(
    public name: string,
    public duration: number,
    public effect: BuffEffect,
  ) {}
}

export type BuffEffect = {
  type: 'increaseAttack' | 'reduceDefense' | 'heal' | 'damage' | 'reduceAttack';
  value: number;
};

export class BuffService {
  private activeBuffs: Map<Kitten, Buff[]> = new Map();

  applyBuff(kitten: Kitten, buff: Buff) {
    if (!this.activeBuffs.has(kitten)) {
      this.activeBuffs.set(kitten, []);
    }
    this.activeBuffs.get(kitten).push(buff);
    this.applyBuffEffect(kitten, buff.effect);
  }

  removeBuff(kitten: Kitten, buffName: string) {
    const buffs = this.activeBuffs.get(kitten) || [];
    const buffToRemove = buffs.find((b) => b.name === buffName);
    if (buffToRemove) {
      this.removeBuffEffect(kitten, buffToRemove.effect);
    }
    this.activeBuffs.set(
      kitten,
      buffs.filter((b) => b.name !== buffName),
    );
  }

  getBuffsForKitten(kitten: Kitten): Buff[] {
    return this.activeBuffs.get(kitten) || [];
  }

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

  private applyBuffEffect(kitten: Kitten, effect: BuffEffect) {
    switch (effect?.type) {
      case 'increaseAttack':
        kitten.stats.strength += effect.value;
        break;
      case 'reduceDefense':
        kitten.stats.strength -= effect.value;
        break;
      case 'heal':
        kitten.healthSystem.hp += effect.value;
        break;
      case 'damage':
        kitten.healthSystem.hp -= effect.value;
        break;
      case 'reduceAttack':
        kitten.stats.strength -= effect.value;
    }
  }

  private removeBuffEffect(kitten: Kitten, effect: BuffEffect) {
    switch (effect?.type) {
      case 'increaseAttack':
        kitten.stats.strength -= effect.value;
        break;
      case 'reduceDefense':
        kitten.stats.strength += effect.value;
        break;
      // For 'heal', 'damage', and 'reduceAttack', we don't reverse the effect when removing the buff
    }
  }
}
