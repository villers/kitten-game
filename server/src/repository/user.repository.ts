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

    return Promise.resolve(User.fromData(updatedUser));
  }
  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return User.fromData(user);
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: { email: user.email, password: user.password },
    });

    return Promise.resolve(User.fromData(createdUser));
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

    return users.map((user) => User.fromData(user));
  }
}
