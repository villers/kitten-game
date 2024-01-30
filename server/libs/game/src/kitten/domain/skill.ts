export enum SkillNameEnum {
  felineAgility = 'felineAgility',
}
export type SkillName = keyof typeof SkillNameEnum;

export interface Skill {
  name: SkillName;
  odds: number;
  type: SkillType;
  toss?: number;
  uses?: number;
}
export type SkillType = 'passive' | 'booster' | 'super' | 'talent';

export const skills: Skill[] = [
  {
    name: 'felineAgility',
    odds: 60,
    type: 'booster',
  },
];
