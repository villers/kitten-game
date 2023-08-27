import * as THREE from 'three';
// @ts-ignore
import * as TWEEN from '@tweenjs/tween.js';

export type StepAction =
  | 'distract'
  | 'esquive'
  | 'raté'
  | 'furySwipe'
  | 'hairball'
  | 'mysticalMeow'
  | 'naptime'
  | 'nineLives'
  | 'pounce'
  | 'protectivePurr'
  | 'sharpClaws'
  | 'purrHealing'
  | 'attaque'
  | 'coup critique';

export class GameLogic {
  private stepIndex: number;
  private attacker: THREE.Object3D | undefined;
  private defender: THREE.Object3D | undefined;

  constructor(
    private scene: THREE.Scene,
    private data: any,
    private setAttacker: (attacker: any) => void,
    private setDefender: (defender: any) => void,
  ) {
    this.stepIndex = 0;
    this.attacker = this.scene.getObjectByName('cat1');
    this.defender = this.scene.getObjectByName('cat2');

    if (!this.attacker || !this.defender) {
      console.error('Attacker or defender not found in scene');
      return;
    }

    this.updateCombat();
  }

  private updateCombat() {
    if (this.stepIndex < this.data.steps.length) {
      const step = this.data.steps[this.stepIndex];
      const action = step.action as StepAction;
      const damageDealt = step.damageDealt;
      const healAmount = step.healAmount;

      switch (action) {
        case 'attaque':
        default:
          this.handleAttack(step);
          break;
        // ... autres actions
      }

      console.log(step);
      this.stepIndex++;
      setTimeout(this.updateCombat.bind(this), 1000);
    } else {
      console.log('Gagnant: ' + this.data.winner.name);
    }
  }

  private handleAttack(step: any) {
    console.log(
      step.action,
      step.description,
      step.attacker.name,
      step.defender.name,
      step.damageDealt,
      step.healAmount,
    );

    const attacker =
      this.data.attacker.name === step.attacker.name
        ? step.attacker
        : step.defender;
    const defender =
      this.data.defender.name === step.defender.name
        ? step.defender
        : step.attacker;
    const newAttacker = {
      ...attacker,
    };
    const newDefender = {
      ...defender,
    };

    this.setAttacker(newAttacker);
    this.setDefender(newDefender);

    console.log(newAttacker, newDefender);

    const target =
      step.attacker.name === this.data.attacker.name
        ? this.attacker
        : this.defender;
    if (target) {
      const direction = target === this.attacker ? 1 : -1;
      const tween = new TWEEN.Tween(target.position)
        .to({ x: target.position.x + 10 * direction }, 200)
        .repeat(1)
        .yoyo(true)
        .start();
    }
  }
}

export default GameLogic;
