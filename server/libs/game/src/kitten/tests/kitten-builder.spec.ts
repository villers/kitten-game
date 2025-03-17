import { kittenBuilder } from './kitten-builder';
import { User } from '@game/game/user/domain/user';
import { Kitten } from '@game/game/kitten/domain/kitten';
import { PasswordText } from '@game/game/user/domain/password-text';
import { EmailText } from '@game/game/user/domain/email-text';

describe('Kitten Builder', () => {
  it('should create a kitten with default values', () => {
    const user = new User(
      1,
      EmailText.of('test@example.com'),
      PasswordText.of('password'),
    );
    const kitten = kittenBuilder().withUser(user).withLevel(1).build();

    expect(kitten).toBeInstanceOf(Kitten);
    expect(kitten.user).toEqual(user);
    expect(kitten.level).toBe(1);
    expect(kitten.attributes.endurance.finalValue).toBe(1);
    expect(kitten.attributes.strength.finalValue).toBe(1);
    expect(kitten.attributes.agility.finalValue).toBe(1);
    expect(kitten.attributes.speed.finalValue).toBe(1);
    expect(kitten.hp).toBe(57);
  });
});
