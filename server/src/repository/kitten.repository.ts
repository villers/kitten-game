import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { KittenRepository } from '@game/game/kitten/application/kitten.repository';
import { Kitten, SkillName, WeaponName } from '@game/game/kitten/domain/kitten';
import { User } from '@game/game/user/domain/user';

@Injectable()
export class KittenRepositoryPrisma implements KittenRepository {
  constructor(private prisma: PrismaService) {}

  async update(kitten: Kitten): Promise<Kitten> {
    const updatedKitten = await this.prisma.kitten.update({
      where: {
        id: kitten.id,
      },
      data: {
        name: kitten.name,
        userId: kitten.user.id,
      },
      include: {
        user: true,
      },
    });

    return Promise.resolve(
      Kitten.fromData({
        id: updatedKitten.id,
        name: updatedKitten.name,
        user: User.fromData({
          id: updatedKitten.user.id,
          email: updatedKitten.user.email,
          password: updatedKitten.user.password,
        }),
        level: updatedKitten.level,
        xp: updatedKitten.xp,
        hp: updatedKitten.hp,
        enduranceValue: updatedKitten.enduranceValue,
        enduranceModifier: updatedKitten.enduranceModifier,
        strengthValue: updatedKitten.strengthValue,
        strengthModifier: updatedKitten.strengthModifier,
        agilityValue: updatedKitten.agilityValue,
        agilityModifier: updatedKitten.agilityModifier,
        speedValue: updatedKitten.speedValue,
        speedModifier: updatedKitten.speedModifier,
        skills: updatedKitten.skills,
        weapons: updatedKitten.weapons,
      }),
    );
  }
  async findByName(name: string): Promise<Kitten> {
    const kitten = await this.prisma.kitten.findFirst({
      where: {
        name: name,
      },
      include: {
        user: true,
      },
    });

    return Kitten.fromData({
      id: kitten.id,
      name: kitten.name,
      user: User.fromData({
        id: kitten.user.id,
        email: kitten.user.email,
        password: kitten.user.password,
      }),
      level: kitten.level,
      xp: kitten.xp,
      hp: kitten.hp,
      enduranceValue: kitten.enduranceValue,
      enduranceModifier: kitten.enduranceModifier,
      strengthValue: kitten.strengthValue,
      strengthModifier: kitten.strengthModifier,
      agilityValue: kitten.agilityValue,
      agilityModifier: kitten.agilityModifier,
      speedValue: kitten.speedValue,
      speedModifier: kitten.speedModifier,
      skills: kitten.skills as SkillName[],
      weapons: kitten.weapons as WeaponName[],
    });
  }

  async create(kitten: Kitten): Promise<Kitten> {
    const createdKitten = await this.prisma.kitten.create({
      data: {
        name: kitten.name,
        userId: kitten.user.id,
        level: kitten.level,
        xp: kitten.xp,
        hp: kitten.hp,
        enduranceValue: kitten.endurance.value,
        enduranceModifier: kitten.endurance.modifier,
        strengthValue: kitten.strength.value,
        strengthModifier: kitten.strength.value,
        agilityValue: kitten.agility.value,
        agilityModifier: kitten.agility.modifier,
        speedValue: kitten.speed.value,
        speedModifier: kitten.speed.modifier,
        skills: kitten.skills,
        weapons: kitten.weapons,
      },
      include: {
        user: true,
      },
    });

    return Kitten.fromData({
      id: createdKitten.id,
      name: createdKitten.name,
      user: User.fromData({
        id: createdKitten.user.id,
        email: createdKitten.user.email,
        password: createdKitten.user.password,
      }),
      level: createdKitten.level,
      xp: createdKitten.xp,
      hp: createdKitten.hp,
      enduranceValue: createdKitten.enduranceValue,
      enduranceModifier: createdKitten.enduranceModifier,
      strengthValue: createdKitten.strengthValue,
      strengthModifier: createdKitten.strengthModifier,
      agilityValue: createdKitten.agilityValue,
      agilityModifier: createdKitten.agilityModifier,
      speedValue: createdKitten.speedValue,
      speedModifier: createdKitten.speedModifier,
      skills: createdKitten.skills,
      weapons: createdKitten.weapons,
    });
  }

  async nameExist(name: string): Promise<boolean> {
    return (
      (await this.prisma.kitten.count({
        where: {
          name: name,
        },
      })) !== 0
    );
  }

  async getAll(): Promise<Kitten[]> {
    const kittens = await this.prisma.kitten.findMany({
      include: {
        user: true,
      },
    });

    return kittens.map((kitten) => {
      return Kitten.fromData({
        id: kitten.id,
        name: kitten.name,
        user: User.fromData({
          id: kitten.user.id,
          email: kitten.user.email,
          password: kitten.user.password,
        }),
        level: kitten.level,
        xp: kitten.xp,
        hp: kitten.hp,
        enduranceValue: kitten.enduranceValue,
        enduranceModifier: kitten.enduranceModifier,
        strengthValue: kitten.strengthValue,
        strengthModifier: kitten.strengthModifier,
        agilityValue: kitten.agilityValue,
        agilityModifier: kitten.agilityModifier,
        speedValue: kitten.speedValue,
        speedModifier: kitten.speedModifier,
        skills: kitten.skills,
        weapons: kitten.weapons,
      });
    });
  }
}
