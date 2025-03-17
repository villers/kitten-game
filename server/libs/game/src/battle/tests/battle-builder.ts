import { BattleSteps } from '@game/game/battle/domain/battle-step';
import { Battle } from '@game/game/battle/domain/battle';
import { Kitten } from '@game/game/kitten/domain/kitten';

interface BattleOptions {
  id?: number;
  combatants?: Kitten[];
  steps?: BattleSteps[];
  winner?: Kitten | null;
  looser?: Kitten | null;
}

export const battleBuilder = ({
  id = 1,
  combatants = [],
  steps = [],
  winner = null,
  looser = null,
}: BattleOptions = {}) => {
  const props = { id, combatants, steps, winner, looser };

  return {
    withId(_id: number) {
      return battleBuilder({
        ...props,
        id: _id,
      });
    },
    withCombatants(_combatants: Kitten[]) {
      return battleBuilder({
        ...props,
        combatants: _combatants,
      });
    },
    withSteps(_steps: BattleSteps[]) {
      return battleBuilder({
        ...props,
        steps: _steps,
      });
    },
    withWinner(_winner: Kitten) {
      return battleBuilder({
        ...props,
        winner: _winner,
      });
    },
    withLooser(_looser: Kitten) {
      return battleBuilder({
        ...props,
        looser: _looser,
      });
    },
    build(): Battle {
      const battle = new Battle(props.id, props.combatants);
      battle.steps = props.steps;
      battle.winner = props.winner;
      battle.looser = props.looser;
      return battle;
    },
  };
};
