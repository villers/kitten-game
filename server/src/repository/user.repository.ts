import { Injectable } from '@nestjs/common';
import { UserRepository } from '@game/game/user/application/user.repository';
import { User } from '@game/game/user/domain/user';
import { PrismaService } from '../service/prisma.service';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        password: user.password,
      },
    });

    return User.fromData({
      id: updatedUser.id,
      email: updatedUser.email,
      password: updatedUser.password,
    });
  }
  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return User.fromData({
      id: user.id,
      email: user.email,
      password: user.password,
    });
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: { email: user.email, password: user.password },
    });

    return User.fromData({
      id: createdUser.id,
      email: createdUser.email,
      password: createdUser.password,
    });
  }

  async emailExist(email: string): Promise<boolean> {
    return (
      (await this.prisma.user.count({
        where: {
          email: email,
        },
      })) !== 0
    );
  }

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) =>
      User.fromData({
        id: user.id,
        email: user.email,
        password: user.password,
      }),
    );
  }
}
