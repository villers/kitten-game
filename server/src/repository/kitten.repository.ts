import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service';
import { KittenRepository } from '@game/game/kitten/application/kitten.repository';
import { Kitten } from '@game/game/kitten/domain/kitten';
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
    });
  }

  async create(kitten: Kitten): Promise<Kitten> {
    const createdKitten = await this.prisma.kitten.create({
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
        id: createdKitten.id,
        name: createdKitten.name,
        user: User.fromData({
          id: createdKitten.user.id,
          email: createdKitten.user.email,
          password: createdKitten.user.password,
        }),
      }),
    );
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

    return kittens.map((kitten) =>
      Kitten.fromData({
        id: kitten.id,
        name: kitten.name,
        user: User.fromData({
          id: kitten.user.id,
          email: kitten.user.email,
          password: kitten.user.password,
        }),
      }),
    );
  }
}
