// skill.registry.ts
import { Skill } from './skill.interface';
import { Pounce } from './pounce';
import { NapTime } from './nap-time';
import { NineLives } from './nine-lives';
import { SharpClaws } from './sharp-claws';
import { Distract, Hairball, PurrHealing } from './hairball';

export class SkillRegistry {
  private skills: Skill[] = [
    new Pounce(),
    new NapTime(),
    new NineLives(),
    new SharpClaws(),
    new Hairball(),
    new PurrHealing(),
    new Distract(),
  ];

  register(skill: Skill) {
    this.skills.push(skill);
  }

  getAll(): Skill[] {
    return this.skills;
  }
}

// organize-fight.usecase.ts (or wherever skills are needed)
const skillRegistry = new SkillRegistry();
const availableSkills = skillRegistry.getAll();
