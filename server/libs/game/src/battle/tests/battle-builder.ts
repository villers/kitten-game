import { Combatant } from '../domain/combatant';
import { BattleSteps } from '@game/game/battle/domain/battle-step';
import { Battle } from '@game/game/battle/domain/battle';

interface BattleOptions {
  id?: number;
  combatants?: Combatant[];
  steps?: BattleSteps[];
  winner?: Combatant | null;
}

export const battleBuilder = ({
  id = 1,
  combatants = [],
  steps = [],
  winner = null,
}: BattleOptions = {}) => {
  const props = { id, combatants, steps, winner };

  return {
    withId(_id: number) {
      return battleBuilder({
        ...props,
        id: _id,
      });
    },
    withCombatants(_combatants: Combatant[]) {
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
    withWinner(_winner: Combatant) {
      return battleBuilder({
        ...props,
        winner: _winner,
      });
    },
    build(): Battle {
      const battle = new Battle(props.id, props.combatants);
      battle.setSteps(props.steps);
      battle.setWinner(props.winner);
      return battle;
    },
  };
};
