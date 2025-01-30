import { Weapon } from './weapon';
import { Armor } from './armor';

export class KittenEquipment {
  private _armor: Armor | null = null;
  private _equippedWeapon: Weapon | null = null;

  equipWeapon(weapon: Weapon) {
    this._equippedWeapon = weapon;
  }

  equipArmor(armor: Armor) {
    this._armor = armor;
  }

  get armor() {
    return this._armor;
  }

  get weapon() {
    return this._equippedWeapon;
  }
}
