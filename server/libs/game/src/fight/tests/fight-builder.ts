import { Kitten } from '@game/game/kitten/domain/kitten';
import { Fight, FightStep } from '@game/game/fight/domain/fight';
import { kittenBuilder } from '@game/game/kitten/tests/kitten-builder';

interface FightOptions {
  id?: number;
  attacker?: Kitten;
  defender?: Kitten;
  winner?: string;
  loser?: string;
  steps?: FightStep[];
  initiative?: number;
}

export const fightBuilder = ({
  id = 1,
  attacker = kittenBuilder().withId(1).withName('attacker').build(),
  defender = kittenBuilder().withId(1).withName('defender').build(),
  winner = 'attacker',
  loser = 'defender',
  steps = [],
  initiative = 0,
}: FightOptions = {}) => {
  const props = { id, attacker, defender, winner, loser, steps, initiative };

  return {
    withId(_id: number) {
      return fightBuilder({
        ...props,
        id: _id,
      });
    },
    withAttacker(_attacker: Kitten) {
      return fightBuilder({
        ...props,
        attacker: _attacker,
      });
    },
    withDefender(_defender: Kitten) {
      return fightBuilder({
        ...props,
        defender: _defender,
      });
    },
    withWinner(_winner: string) {
      return fightBuilder({
        ...props,
        winner: _winner,
      });
    },
    withLoser(_loser: string) {
      return fightBuilder({
        ...props,
        loser: _loser,
      });
    },
    withSteps(_steps: FightStep[]) {
      return fightBuilder({
        ...props,
        steps: _steps,
      });
    },
    withInitiative(_initiative: number) {
      return fightBuilder({
        ...props,
        initiative: _initiative,
      });
    },
    build(): Fight {
      return Fight.fromData({
        id: props.id,
        attacker: props.attacker,
        defender: props.defender,
        winner: props.winner,
        loser: props.loser,
        steps: props.steps,
        initiative: props.initiative,
      });
    },
  };
};
