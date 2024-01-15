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
        enduranceStat: updatedKitten.enduranceStat,
        enduranceModifier: updatedKitten.enduranceModifier,
        enduranceValue: updatedKitten.enduranceValue,
        strengthStat: updatedKitten.strengthStat,
        strengthModifier: updatedKitten.strengthModifier,
        strengthValue: updatedKitten.strengthValue,
        agilityStat: updatedKitten.agilityStat,
        agilityModifier: updatedKitten.agilityModifier,
        agilityValue: updatedKitten.agilityValue,
        speedStat: updatedKitten.speedStat,
        speedModifier: updatedKitten.speedModifier,
        speedValue: updatedKitten.speedValue,
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
      enduranceStat: kitten.enduranceStat,
      enduranceModifier: kitten.enduranceModifier,
      enduranceValue: kitten.enduranceValue,
      strengthStat: kitten.strengthStat,
      strengthModifier: kitten.strengthModifier,
      strengthValue: kitten.strengthValue,
      agilityStat: kitten.agilityStat,
      agilityModifier: kitten.agilityModifier,
      agilityValue: kitten.agilityValue,
      speedStat: kitten.speedStat,
      speedModifier: kitten.speedModifier,
      speedValue: kitten.speedValue,
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
        enduranceStat: kitten.enduranceStat,
        enduranceModifier: kitten.enduranceModifier,
        enduranceValue: kitten.enduranceValue,
        strengthStat: kitten.strengthStat,
        strengthModifier: kitten.strengthModifier,
        strengthValue: kitten.strengthValue,
        agilityStat: kitten.agilityStat,
        agilityModifier: kitten.agilityModifier,
        agilityValue: kitten.agilityValue,
        speedStat: kitten.speedStat,
        speedModifier: kitten.speedModifier,
        speedValue: kitten.speedValue,
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
      enduranceStat: createdKitten.enduranceStat,
      enduranceModifier: createdKitten.enduranceModifier,
      enduranceValue: createdKitten.enduranceValue,
      strengthStat: createdKitten.strengthStat,
      strengthModifier: createdKitten.strengthModifier,
      strengthValue: createdKitten.strengthValue,
      agilityStat: createdKitten.agilityStat,
      agilityModifier: createdKitten.agilityModifier,
      agilityValue: createdKitten.agilityValue,
      speedStat: createdKitten.speedStat,
      speedModifier: createdKitten.speedModifier,
      speedValue: createdKitten.speedValue,
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
        enduranceStat: kitten.enduranceStat,
        enduranceModifier: kitten.enduranceModifier,
        enduranceValue: kitten.enduranceValue,
        strengthStat: kitten.strengthStat,
        strengthModifier: kitten.strengthModifier,
        strengthValue: kitten.strengthValue,
        agilityStat: kitten.agilityStat,
        agilityModifier: kitten.agilityModifier,
        agilityValue: kitten.agilityValue,
        speedStat: kitten.speedStat,
        speedModifier: kitten.speedModifier,
        speedValue: kitten.speedValue,
        skills: kitten.skills,
        weapons: kitten.weapons,
      });
    });
  }
}
