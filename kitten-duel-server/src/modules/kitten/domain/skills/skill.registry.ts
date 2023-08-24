import { Skill } from './skill.interface';

export class SkillRegistry {
  private skills: Skill[] = [];

  register(skill: Skill) {
    this.skills.push(skill);
  }

  getAll(): Skill[] {
    return this.skills;
  }
}
