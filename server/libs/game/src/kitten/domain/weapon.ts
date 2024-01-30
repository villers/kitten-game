export enum WeaponNameEnum {
  sword = 'sword',
}
export type WeaponName = keyof typeof WeaponNameEnum;

export interface Weapon {
  name: WeaponName;
  odds: number;
  tempo: number;
  reversal: number;
  evasion: number;
  swiftness: number;
  block: number;
  accuracy: number;
  disarm: number;
  combo: number;
  damage: number;
  toss: number;
  reach: number;
}

export const weapons: Weapon[] = [
  {
    name: 'sword',
    odds: 4,
    tempo: 1.8,
    reversal: 0,
    evasion: -0.2,
    swiftness: -0.1,
    block: 0,
    accuracy: -0.2,
    disarm: 0.1,
    combo: 0,
    damage: 28,
    toss: 5,
    reach: 2,
  },
];
