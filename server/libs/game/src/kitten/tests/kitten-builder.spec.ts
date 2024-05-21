import { kittenBuilder } from './kitten-builder';
import { StatValue } from '@game/game/kitten/domain/stats-value';
import { EmailText, PasswordText, User } from '@game/game/user/domain/user';
import { Kitten } from '@game/game/kitten/domain/kitten';

describe('Kitten Builder', () => {
  it('should create a kitten with default values', () => {
    const user = new User(
      1,
      EmailText.of('test@example.com'),
      PasswordText.of('password'),
    );
    const kitten = kittenBuilder()
      .withUser(user)
      .withEndurance(StatValue.of(1, 1))
      .withStrength(StatValue.of(1, 1))
      .withAgility(StatValue.of(1, 1))
      .withSpeed(StatValue.of(1, 1))
      .withLevel(1)
      .build();

    expect(kitten).toBeInstanceOf(Kitten);
    expect(kitten.user).toEqual(user);
    expect(kitten.level).toBe(1);
    expect(kitten.endurance.finalValue).toBe(1);
    expect(kitten.strength.finalValue).toBe(1);
    expect(kitten.agility.finalValue).toBe(1);
    expect(kitten.speed.finalValue).toBe(1);
    expect(kitten.hp).toBe(57); // Adjust according to the formula used in calculateHP
  });
});
