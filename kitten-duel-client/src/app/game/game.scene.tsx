'use client';
import Phaser from 'phaser';

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

export class GameScene extends Phaser.Scene {
  private combatData: any;

  private nomPersonnage1: Phaser.GameObjects.Text | null = null;
  private nomPersonnage2: Phaser.GameObjects.Text | null = null;

  private personnage1: Phaser.GameObjects.Image | null = null;
  private personnage2: Phaser.GameObjects.Image | null = null;

  private hpText1: Phaser.GameObjects.Text | null = null;
  private hpText2: Phaser.GameObjects.Text | null = null;

  private barreDeVie1: Phaser.GameObjects.Image | null = null;
  private barreDeVie2: Phaser.GameObjects.Image | null = null;

  private winnerText: Phaser.GameObjects.Text | null = null;
  private actionText: Phaser.GameObjects.Text | null = null;
  private descriptionText: Phaser.GameObjects.Text | null = null;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: any) {
    this.combatData = data.combatData;
  }

  preload() {
    this.load.image('background', 'images/fight/background.png');
    this.load.image('personnage1', 'images/fight/chaton_mignon.png');
    this.load.image('personnage2', 'images/fight/chaton_mignon.png');
    this.load.image('barreDeVie', 'images/fight/barreDeVie.png');
  }

  create() {
    this.add.image(400, 300, 'background');

    this.nomPersonnage1 = this.add.text(
      200,
      80,
      this.combatData.attacker.name,
      { fontSize: '16px', color: '#fff' },
    );
    this.nomPersonnage2 = this.add.text(
      600,
      80,
      this.combatData.defender.name,
      { fontSize: '16px', color: '#fff' },
    );

    this.personnage1 = this.add.image(200, 300, 'personnage1');
    this.personnage2 = this.add.image(600, 300, 'personnage2');

    this.hpText1 = this.add.text(270, 100, '', {
      fontSize: '16px',
      color: '#fff',
    });
    this.hpText2 = this.add.text(670, 100, '', {
      fontSize: '16px',
      color: '#fff',
    });

    this.barreDeVie1 = this.add.image(200, 100, 'barreDeVie');
    this.barreDeVie2 = this.add.image(600, 100, 'barreDeVie');

    this.winnerText = this.add
      .text(400, 50, '', {
        fontSize: '32px',
        color: '#fff',
      })
      .setOrigin(0.5, 0.5);

    this.actionText = this.add.text(20, 20, '', {
      fontSize: '16px',
      color: '#fff',
    });
    this.descriptionText = this.add.text(20, 40, '', {
      fontSize: '16px',
      color: '#fff',
    });

    this.startCombat();
  }

  update() {
    // Mettez à jour les objets du jeu à chaque étape du combat
  }

  startCombat() {
    let stepIndex = 0;

    const updateCombat = () => {
      if (stepIndex < this.combatData.steps.length) {
        const step = this.combatData.steps[stepIndex];

        this.actionText?.setText(step.action);
        this.descriptionText?.setText(step.description);

        switch (step.action as StepAction) {
          case 'attaque':
          default:
            this.handleAttack(step);
            break;
          // ... autres actions
        }

        this.tweens.add({
          targets:
            step.attacker.name === this.combatData.attacker.name
              ? this.personnage1
              : this.personnage2,
          x: '+=10',
          duration: 200,
          yoyo: true,
        });

        stepIndex++;
        setTimeout(updateCombat, 1000);
      } else {
        this.winnerText?.setText('Gagnant: ' + this.combatData.winner.name);
      }
    };

    updateCombat();
  }

  handleAttack(step: any) {
    // jouez l'animation d'attaque
    console.log(
      step.action,
      step.description,
      step.attacker.name,
      step.defender.name,
      step.damageDealt,
      step.healAmount,
    );
    // jouez l'effet sonore d'attaque
    // mettez à jour les barres de vie
    this.hpText1?.setText(String(step.attacker.hp));
    this.hpText2?.setText(String(step.defender.hp));
    this.barreDeVie1?.setScale(step.attacker.hp / step.attacker.maxHp, 1);
    this.barreDeVie2?.setScale(step.defender.hp / step.defender.maxHp, 1);
    // affichez les dégâts infligés
    let damageText: Phaser.GameObjects.Text | null;

    if (step.damageDealt >= 1) {
      damageText = this.add.text(400, 300, '-' + step.damageDealt, {
        fontSize: '32px',
        color: '#ff0000',
      });
    } else if (step.healAmount >= 1) {
      damageText = this.add.text(400, 300, '-' + step.healAmount, {
        fontSize: '32px',
        color: '#00FF00',
      });
    }
    setTimeout(() => damageText?.destroy(), 500);
  }
}
