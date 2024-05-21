import {
  BASE_FIGHTER_STATS,
  FighterStat,
  Kitten,
} from '@game/game/kitten/domain/kitten';
import { Weapon, WeaponName } from '@game/game/kitten/domain/weapon';
import { Skill, SkillName } from '@game/game/kitten/domain/skill';
import {
  DefaultRandomGenerator,
  RandomGenerator,
} from '@game/game/utils/random/random-generator';
import { FightWithSameKittenError } from '@game/game/fight/domain/errors';

export interface LeaveStep {
  action: 'leave';
  brute: string;
}

export interface ArriveStep {
  action: 'arrive';
  brute: string;
}

export interface HealStep {
  action: 'heal';
  brute: string;
  amount: number;
  poisonHeal?: boolean;
}

export interface ResistStep {
  action: 'resist';
  brute: string;
}

export interface SurviveStep {
  action: 'survive';
  brute: string;
}

export interface HitStep {
  action: 'hit' | 'flashFlood' | 'hammer' | 'poison';
  fighter: string;
  target: string;
  weapon: WeaponName | null;
  damage: number;
}

export interface EquipStep {
  action: 'equip';
  brute: string;
  name: WeaponName;
}

export interface AttemptHitStep {
  action: 'attemptHit';
  fighter: string;
  target: string;
  weapon: WeaponName | null;
  brokeShield?: boolean;
}

export interface BlockStep {
  action: 'block';
  fighter: string;
}

export interface EvadeStep {
  action: 'evade';
  fighter: string;
}

export interface DisarmStep {
  action: 'disarm';
  fighter: string;
  opponent: string;
  weapon: WeaponName;
}

export interface DeathStep {
  action: 'death';
  fighter: string;
}

export interface EndStep {
  action: 'end';
  winner: string;
  loser: string;
}

export interface CounterStep {
  action: 'counter';
  fighter: string;
  opponent: string;
}

export interface SkillActivateStep {
  action: 'skillActivate';
  brute: string;
  skill: SkillName;
}

export interface SkillExpireStep {
  action: 'skillExpire';
  brute: string;
  skill: SkillName;
}

export interface SpyStep {
  action: 'spy';
  brute: string;
  opponent: string;
  sent: WeaponName[];
  received: WeaponName[];
}

export interface MoveStep {
  action: 'moveTo';
  fighter: string;
  target: string;
  sameSpace?: boolean;
  countered?: boolean;
}

export type FightStep =
  | LeaveStep
  | ArriveStep
  | MoveStep
  | HealStep
  | ResistStep
  | SurviveStep
  | HitStep
  | EquipStep
  | AttemptHitStep
  | BlockStep
  | EvadeStep
  | DisarmStep
  | DeathStep
  | EndStep
  | CounterStep
  | SkillActivateStep
  | SkillExpireStep
  | SpyStep;

export class Fight {
  constructor(
    private _id: number,
    private _attacker: Kitten,
    private _defender: Kitten,
    private _fighters: Kitten[] = [],
    private _winner: string | null = null,
    private _loser: string | null = null,
    private _steps: FightStep[] = [],
    private _initiative: number = 0,
    private _randomGenerator: RandomGenerator = new DefaultRandomGenerator(),
  ) {
    if (_attacker.id === _defender.id) {
      throw new FightWithSameKittenError('Kittens must be different');
    }
  }

  get id(): number {
    return this._id;
  }

  get attacker(): Kitten {
    return this._attacker;
  }

  get defender(): Kitten {
    return this._defender;
  }

  get fighters(): Kitten[] {
    return this._fighters;
  }

  get winner(): string | null {
    return this._winner;
  }

  get loser(): string | null {
    return this._loser;
  }

  get steps(): FightStep[] {
    return this._steps;
  }

  get initiative(): number {
    return this._initiative;
  }

  set id(id: number) {
    this._id = id;
  }

  set attacker(attacker: Kitten) {
    this._attacker = attacker;
  }

  set defender(defender: Kitten) {
    this._defender = defender;
  }

  set winner(winner: string | null) {
    this._winner = winner;
  }

  set loser(loser: string | null) {
    this._loser = loser;
  }

  set steps(steps: FightStep[]) {
    this._steps = steps;
  }

  set initiative(initiative: number) {
    this._initiative = initiative;
  }

  get data() {
    return {
      id: this.id,
      attacker: this.attacker,
      defender: this.defender,
      winner: this.winner,
      loser: this.loser,
      steps: this.steps,
      initiative: this.initiative,
    };
  }

  static fromData(data: Fight['data']) {
    return new Fight(data.id, data.attacker, data.defender);
  }

  simulate() {
    this.initializeCombat();

    while (this.winner === null) {
      this.orderFighters();
      this.playFighterTurn();
      this.checkForWinner();
    }

    this.finalizeCombat();
  }

  private initializeCombat() {
    this._fighters = [this.attacker, this.defender];
    this._fighters.forEach((brute) => {
      this.steps.push({
        action: 'arrive',
        brute: brute.name,
      });
    });
  }

  private checkForWinner() {
    if (this._attacker.hp <= 0) {
      this.winner = this._defender.name;
      this.loser = this._attacker.name;
    } else if (this._defender.hp <= 0) {
      this.winner = this._attacker.name;
      this.loser = this._defender.name;
    }

    if (this.winner && this.loser) {
      this.steps.push({
        action: 'death',
        fighter: this.loser,
      });
    }
  }

  private finalizeCombat() {
    this.steps.push({
      action: 'end',
      winner: this.winner,
      loser: this.loser,
    });
  }

  private orderFighters() {
    this._fighters = this._fighters.sort((a, b) => {
      // Last if hp <= 0
      if (a.hp <= 0) return 1;
      if (b.hp <= 0) return -1;
      // Random is initiatives are equal
      if (a.initiative === b.initiative) {
        return this._randomGenerator.random() > 0.5 ? 1 : -1;
      }
      // Lower initiative first
      return a.initiative - b.initiative;
    });

    this.initiative = this._fighters[0].initiative;
  }

  private playFighterTurn() {
    const fighter = this._fighters[0];
    const opponent = this._fighters[1];
    const countered = this.counterAttack(fighter, opponent);

    // Add moveTo step
    this.steps.push({
      action: 'moveTo',
      fighter: fighter.name,
      target: opponent.name,
      countered,
    });

    const possibleSuper = this.randomlyGetSuper(fighter);
    if (possibleSuper) {
      // End turn if super activated
      if (this.activateSuper(possibleSuper)) {
        return;
      }
    }

    if (countered) {
      // Add counter step
      this.steps.push({
        action: 'counter',
        fighter: opponent.name,
        opponent: fighter.name,
      });

      this.startAttack(opponent, fighter, true);
    } else {
      this.startAttack(fighter, fighter, false);
    }
  }

  private startAttack(fighter: Kitten, opponent: Kitten, isCounter?: boolean) {
    const initialFighterHp = fighter.hp;

    const attackResult = {
      blocked: false,
      reversed: false,
    };

    // Trigger fighter attack
    const { blocked, reversed } = this.attack(fighter, opponent);

    // Keep track of attack status
    if (blocked) attackResult.blocked = true;
    if (reversed) attackResult.reversed = true;

    // Get combo chances
    let combo = 0.1;

    // Repeat attack only if not countering
    if (!isCounter) {
      let random = this._randomGenerator.random();
      while (!attackResult.reversed && random < combo) {
        // Stop the combo if the fighter took a hit
        if (fighter.hp < initialFighterHp) {
          break;
        }

        // Decrease combo chances
        combo *= 0.5;

        // Trigger fighter attack
        const { blocked: comboBlocked, reversed: comboReversed } = this.attack(
          fighter,
          opponent,
        );

        // Keep track of attack status
        if (comboBlocked) attackResult.blocked = true;
        if (comboReversed) attackResult.reversed = true;

        random = this._randomGenerator.random();
      }

      // Check if the opponent reverses the attack
      if (attackResult.reversed) {
        this.attack(opponent, fighter);
      }
    }
  }

  private attack(fighter: Kitten, opponent: Kitten) {
    // Abort if fighter is dead
    if (fighter.hp <= 0) return { blocked: false };

    // Get damage
    let damage = this.getDamage(fighter, opponent);
    const blocked = this.block(fighter, opponent);
    const evaded = this.evade(fighter, opponent);

    // Prepare attempt step
    const attemptStep: AttemptHitStep = {
      action: 'attemptHit',
      fighter: fighter.name,
      target: opponent.name,
      weapon: fighter.activeWeapon?.name || null,
    };

    // Check if opponent evaded
    if (evaded) {
      this.steps.push(attemptStep);

      damage = 0;

      // Add evade step
      this.steps.push({
        action: 'evade',
        fighter: opponent.name,
      });
    } else {
      if (blocked) {
        damage = 0;

        // Add block step
        this.steps.push({
          action: 'block',
          fighter: opponent.name,
        });
      }
    }

    // Register hit if damage was done
    if (damage) {
      opponent.hp -= damage;
    }

    return {
      blocked: !evaded && blocked,
      reversed: !evaded || (!evaded && blocked),
    };
  }

  private getDamage(fighter: Kitten, opponent: Kitten, thrown?: Weapon) {
    const base = thrown
      ? thrown.damage
      : fighter.activeWeapon?.damage || fighter.strength.finalValue;
    const skillsMultiplier = 1;

    let damage = 0;

    if (thrown) {
      damage = Math.floor(
        (base +
          fighter.strength.finalValue * 0.1 +
          fighter.agility.finalValue * 0.15) *
          (1 + this._randomGenerator.random() * 0.5),
      );
    } else {
      damage = Math.floor(
        (base + fighter.strength.finalValue * (0.2 + base * 0.05)) *
          (0.8 + this._randomGenerator.random() * 0.4) *
          skillsMultiplier,
      );
    }

    // Set minimum damage to 1
    if (damage < 1) {
      damage = 1;
    }

    return damage;
  }

  private counterAttack(fighter: Kitten, opponent: Kitten) {
    // No counter-attack if opponent is dead
    if (opponent.hp <= 0) return false;

    const random = this._randomGenerator.random();

    const valueToBeat =
      ((opponent.activeWeapon?.reach || 0) -
        (fighter.activeWeapon?.reach || 0)) *
      0.1;

    return random < valueToBeat;
  }

  private block(fighter: Kitten, opponent: Kitten, ease = 1) {
    // No block if opponent is dead
    if (opponent.hp <= 0) return false;

    return (
      this._randomGenerator.random() * ease <
      this.getFighterStat(opponent, 'block') -
        this.getFighterStat(fighter, 'accuracy', 'weapon')
    );
  }

  private evade(fighter: Kitten, opponent: Kitten, difficulty = 1) {
    // No evasion if opponent is dead
    if (opponent.hp <= 0) return false;

    // Get agility difference (-40 > diff > 40)
    const agilityDifference = Math.min(
      Math.max(
        -40,
        (opponent.agility.finalValue - fighter.agility.finalValue) * 2,
      ),
      40,
    );

    const random = this._randomGenerator.random();

    return (
      random * difficulty <
      Math.min(
        this.getFighterStat(opponent, 'evasion') +
          agilityDifference * 0.01 -
          this.getFighterStat(fighter, 'accuracy', 'fighter') -
          this.getFighterStat(fighter, 'swiftness'),
        0.9,
      )
    );
  }

  private getFighterStat(
    fighter: Kitten,
    stat: FighterStat,
    onlyStat?: 'fighter' | 'weapon',
  ) {
    // Special case for swiftness as it only exists on weapons
    if (stat === 'swiftness') {
      if (onlyStat === 'fighter') return 0;

      if (fighter.activeWeapon) {
        return fighter.activeWeapon[stat];
      }

      return BASE_FIGHTER_STATS[stat];
    }

    // Special case for tempo as it's either weapon or base
    if (stat === 'tempo') {
      if (fighter.activeWeapon) {
        return fighter.activeWeapon[stat];
      }

      return BASE_FIGHTER_STATS[stat];
    }

    let total = onlyStat === 'weapon' ? 0 : fighter[stat];

    if (onlyStat !== 'fighter') {
      if (fighter.activeWeapon) {
        total += fighter.activeWeapon[stat];
      } else {
        total += BASE_FIGHTER_STATS[stat];
      }
    }

    return total;
  }

  private randomlyGetSuper(brute: Kitten) {
    const supers = brute.skills.filter((skill) => skill.uses);

    if (!supers.length) return null;

    const NO_SUPER_TOSS = 10;
    const randomSuper = this._randomGenerator.between(
      0,
      supers.reduce((acc, skill) => acc + (skill.toss || 0), 0) + NO_SUPER_TOSS,
    );

    let toss = 0;
    for (let i = 0; i < supers.length; i += 1) {
      toss += supers[i].toss || 0;
      if (randomSuper < toss) {
        return supers[i];
      }
    }

    return null;
  }

  private activateSuper(skill: Skill): boolean {
    // No uses left (should never happen)
    if (!skill.uses) return false;

    // Get current fighter
    const fighter = this._fighters[0];

    switch (skill.name) {
      // Steal opponent's weapon if he has one
      case 'felineAgility': {
        // Add skill to active skills
        fighter.activeSkills.push(skill);

        // Add skill activation step
        this.steps.push({
          action: 'skillActivate',
          brute: fighter.name,
          skill: skill.name,
        });

        break;
      }

      case 'testSkill': {
        // Add skill to active skills
        fighter.activeSkills.push(skill);

        // Add skill activation step
        this.steps.push({
          action: 'skillActivate',
          brute: fighter.name,
          skill: skill.name,
        });

        break;
      }

      default:
        return false;
    }

    // Spend one use
    skill.uses -= 1;

    // Remove skill if no uses left
    if (!skill.uses) {
      fighter.skills.splice(
        fighter.skills.findIndex((s) => s.name === skill.name),
        1,
      );
    }

    return true;
  }
}
