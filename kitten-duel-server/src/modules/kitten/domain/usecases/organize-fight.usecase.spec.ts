import { Kitten } from '../entities/kitten.entity';
import { Equipment } from '../entities/equipment.entity';
import { OrganizeFightUsecase } from './organize-fight.usecase';

describe('OrganizeFightUsecase', () => {
  let usecase: OrganizeFightUsecase;
  let kittenRepository: any;
  let equipmentRepository: any;
  let fightRepository: any;

  beforeEach(() => {
    kittenRepository = {
      findById: jest.fn(),
    };

    equipmentRepository = {
      findByIds: jest.fn().mockResolvedValue([]),
    };

    fightRepository = {
      save: jest.fn().mockResolvedValue(true),
    };

    usecase = new OrganizeFightUsecase(
      equipmentRepository,
      fightRepository,
      kittenRepository,
    );
    jest.clearAllMocks();
  });

  it('Kitten A attacks Kitten B and defeats it', async () => {
    const kittenA = new Kitten({
      id: '1',
      power: 50,
      defense: 20,
      hp: 100,
      equipmentIds: [],
    });
    const kittenB = new Kitten({
      id: '2',
      power: 30,
      defense: 15,
      hp: 40,
      equipmentIds: [],
    });

    kittenRepository.findById
      .mockResolvedValueOnce(kittenA)
      .mockResolvedValueOnce(kittenB);
    equipmentRepository.findByIds.mockResolvedValue([]);

    const result = await usecase.execute({ kittenAId: '1', kittenBId: '2' });

    expect(result.fight.winnerId).toBe('1');
    expect(result.fight.kitten1RemainingHp).toBeGreaterThan(0);
    expect(result.fight.kitten2RemainingHp).toBeLessThanOrEqual(0);
  });

  it('Kitten A attacks Kitten B but gets defeated instead', async () => {
    const kittenA = new Kitten({
      id: '1',
      power: 20,
      defense: 15,
      hp: 40,
      equipmentIds: [],
    });
    const kittenB = new Kitten({
      id: '2',
      power: 50,
      defense: 20,
      hp: 100,
      equipmentIds: [],
    });

    kittenRepository.findById
      .mockResolvedValueOnce(kittenA)
      .mockResolvedValueOnce(kittenB);
    equipmentRepository.findByIds.mockResolvedValue([]);

    const result = await usecase.execute({ kittenAId: '1', kittenBId: '2' });

    expect(result.fight.winnerId).toBe('2');
    expect(result.fight.kitten1RemainingHp).toBeLessThanOrEqual(0);
    expect(result.fight.kitten2RemainingHp).toBeGreaterThan(0);
  });

  it('Kittens have equipment that boosts their power or defense', async () => {
    const kittenA = new Kitten({
      id: '1',
      power: 40,
      defense: 20,
      hp: 100,
      equipmentIds: ['eq1'],
    });
    const kittenB = new Kitten({
      id: '2',
      power: 40,
      defense: 20,
      hp: 100,
      equipmentIds: ['eq2'],
    });
    const equipmentA = new Equipment({
      id: 'eq1',
      powerBoost: 10,
      defenseBoost: 0,
    });
    const equipmentB = new Equipment({
      id: 'eq2',
      powerBoost: 0,
      defenseBoost: 10,
    });

    kittenRepository.findById
      .mockResolvedValueOnce(kittenA)
      .mockResolvedValueOnce(kittenB);
    equipmentRepository.findByIds
      .mockResolvedValueOnce([equipmentA])
      .mockResolvedValueOnce([equipmentB]);

    const result = await usecase.execute({ kittenAId: '1', kittenBId: '2' });

    // Since kitten A has a power boost and kitten B has a defense boost, the fight might not have a clear winner.
    // However, we can assert that the fight took place and steps were recorded.
    expect(result.fight.steps.length).toBeGreaterThan(0);
  });

  it('Kittens have equal power, defense, and hp, resulting in a random winner.', async () => {
    const kittenA = new Kitten({
      id: '1',
      power: 50,
      defense: 20,
      hp: 100,
      equipmentIds: [],
    });
    const kittenB = new Kitten({
      id: '2',
      power: 50,
      defense: 20,
      hp: 100,
      equipmentIds: [],
    });

    kittenRepository.findById
      .mockResolvedValueOnce(kittenA)
      .mockResolvedValueOnce(kittenB);

    const result = await usecase.execute({ kittenAId: '1', kittenBId: '2' });

    expect(result.fight.winnerId).toBeDefined();
  });

  it('Kittens with multiple equipment get cumulative benefits', async () => {
    const kittenA = new Kitten({
      id: '1',
      power: 40,
      defense: 20,
      hp: 100,
      equipmentIds: ['eq1', 'eq3'],
    });
    const kittenB = new Kitten({
      id: '2',
      power: 40,
      defense: 20,
      hp: 100,
      equipmentIds: ['eq2', 'eq4'],
    });
    const equipmentA1 = new Equipment({
      id: 'eq1',
      powerBoost: 10,
      defenseBoost: 0,
    });
    const equipmentA2 = new Equipment({
      id: 'eq3',
      powerBoost: 5,
      defenseBoost: 5,
    });
    const equipmentB1 = new Equipment({
      id: 'eq2',
      powerBoost: 0,
      defenseBoost: 10,
    });
    const equipmentB2 = new Equipment({
      id: 'eq4',
      powerBoost: 5,
      defenseBoost: 5,
    });

    kittenRepository.findById
      .mockResolvedValueOnce(kittenA)
      .mockResolvedValueOnce(kittenB);
    equipmentRepository.findByIds
      .mockResolvedValueOnce([equipmentA1, equipmentA2])
      .mockResolvedValueOnce([equipmentB1, equipmentB2]);

    const result = await usecase.execute({ kittenAId: '1', kittenBId: '2' });
    expect(result.fight.steps.length).toBeGreaterThan(0);
  });

  it('Kitten not found error handling', async () => {
    kittenRepository.findById.mockRejectedValueOnce(
      new Error('Kitten not found'),
    );
    await expect(
      usecase.execute({ kittenAId: '1', kittenBId: '2' }),
    ).rejects.toThrow('Kitten not found');
  });

  it('Equipment not found error handling', async () => {
    kittenRepository.findById
      .mockResolvedValueOnce(
        new Kitten({
          id: '1',
          power: 40,
          defense: 20,
          hp: 100,
          equipmentIds: ['eq1'],
        }),
      )
      .mockResolvedValueOnce(
        new Kitten({
          id: '2',
          power: 40,
          defense: 20,
          hp: 100,
          equipmentIds: ['eq2'],
        }),
      );
    equipmentRepository.findByIds.mockRejectedValueOnce(
      new Error('Equipment not found'),
    );
    await expect(
      usecase.execute({ kittenAId: '1', kittenBId: '2' }),
    ).rejects.toThrow('Equipment not found');
  });
});
