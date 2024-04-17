export enum SkillNameEnum {
  felineAgility = 'felineAgility',
  testSkill = 'testSkill',
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
    odds: 2.5,
    type: 'super',
    toss: 8,
    uses: 2,
  },
  {
    name: 'testSkill',
    odds: 2.5,
    type: 'super',
    toss: 8,
    uses: 2,
  },
];
