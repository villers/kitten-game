import { Kitten } from '../entities/kitten.entity';
import { FightStep } from '../entities/fight.entity';

/**
 * Voici une vue d'ensemble des compétences des chatons:
 *
 * SharpClaws (Griffes acérées):
 * activationChance : 15%
 * Effet : Reçoit un buff GriffesAcerées qui augmente ses dégâts de 50% pendant 3 tours.
 * Description : "Griffes acérées! Augmentation des dégâts pendant 3 tours."
 *
 * Hairball (Boule de poils):
 * activationChance : 15%
 * Effet : Inflige des dégâts basés sur la force du chaton (par exemple, la moitié de la force).
 * Description : "Boule de poils lancée! Petite attaque surprise."
 *
 * PurrHealing (Ronronnement thérapeutique):
 * activationChance : 20%
 * Effet : Soigne le chaton basé sur sa vitalité (par exemple, 1,5 fois la vitalité).
 * Description : "Ronronnement thérapeutique! Récupération de la santé."
 *
 * Distract (Distraction):
 * activationChance : 10%
 * Effet : Distrait le chaton défenseur, qui pourrait perdre son prochain tour.
 * Description : "Distraction! Le défenseur pourrait perdre son prochain tour."
 *
 *  NapTime (Temps de Sieste):
 * activationChance : 20%
 * Effet : Soigne le chaton d'une certaine quantité (par exemple, 10 points de vie).
 * Description : "Temps de Sieste! Récupération de la santé."
 *
 * NineLives (Neuf vies):
 * activationChance : Seulement si le chaton a 10% ou moins de ses points de vie et n'a pas déjà utilisé cette compétence.
 * Effet : Soigne le chaton à 50% de ses points de vie max.
 * Description : "Neuf vies! Récupération à 50% de la santé."
 *
 *  Pounce (Attaque Surprise):
 * activationChance : 10%
 * Effet : Inflige des dégâts basés sur la puissance d'attaque du chaton.
 * Description : "Attaque Surprise réussie!"
 */
export interface SkillArgs {
  attacker?: Kitten;
  defender?: Kitten;
  // ... other properties
}

export interface Skill {
  isActive({ attacker, defender }: SkillArgs): boolean;
  execute({ attacker, defender }: SkillArgs): FightStep;
}
