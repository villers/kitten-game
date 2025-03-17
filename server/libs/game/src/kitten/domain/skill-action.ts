import { Kitten } from './kitten';

export interface SkillAction {
  name: string;
  cooldown: number;
  currentCooldown: number;
  use(attacker: Kitten, defender: Kitten): void;
  isOnCooldown(): boolean;
  reduceCooldown(): void;
}
