export class Kitten {
  id: string;
  name: string;

  // Nouvelles stats
  force: number; // Augmente la puissance d'attaque
  dexterity: number; // Augmente les chances de toucher
  agility: number; // Augmente l'esquive et la vitesse d'attaque
  luck: number; // Augmente les chances de faire un coup critique
  vitality: number; // Augmente les points de vie

  hp: number; // Points de vie

  equipmentIds: string[];
  victories: number;
  defeats: number;
  level: number = 1;
  xp: number = 0; // Points d'expérience accumulés par le chaton
  availableAttributePoints: number = 0; // Points disponibles pour la distribution

  constructor(partial?: Partial<Kitten>) {
    Object.assign(this, partial);
  }

  isAlive(): boolean {
    return this.hp > 0;
  }

  // Nouvelles méthodes pour calculer les stats
  getAttackPower(): number {
    return this.force * 5; // Multiplicateur d'exemple
  }

  getHitChance(): number {
    return this.dexterity * 2; // Multiplicateur d'exemple
  }

  getDodgeChance(): number {
    return this.agility * 2; // Multiplicateur d'exemple
  }

  getCriticalChance(): number {
    return this.luck * 1.5; // Multiplicateur d'exemple
  }

  getMaxHp(): number {
    return this.vitality * 10; // Multiplicateur d'exemple
  }
}
