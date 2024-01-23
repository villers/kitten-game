import { Kitten } from '@game/game/kitten/domain/kitten';
import { Fight } from '@game/game/fight/domain/fight';
import { kittenBuilder } from '@game/game/kitten/tests/kitten-builder';

interface FightOptions {
  id?: number;
  attacker?: Kitten;
  defender?: Kitten;
}

export const fightBuilder = ({
  id = 1,
  attacker = kittenBuilder().withId(1).withName('attacker').build(),
  defender = kittenBuilder().withId(1).withName('defender').build(),
}: FightOptions = {}) => {
  const props = { id, attacker, defender };

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
    build(): Fight {
      return Fight.fromData({
        id: props.id,
        attacker: props.attacker,
        defender: props.defender,
      });
    },
  };
};
