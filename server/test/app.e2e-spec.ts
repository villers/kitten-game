import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';
import { UserRepositoryPrisma } from '../src/repository/user.repository';
import { PrismaService } from '../src/service/prisma.service';
import { userBuilder } from '@game/game/user/tests/user-builder';

const asyncExec = promisify(exec);

describe('AppController (e2e)', () => {
  let container: StartedPostgreSqlContainer;
  let prismaClient: PrismaClient;
  let userRepositoryPrisma: UserRepositoryPrisma;
  let app: INestApplication;

  beforeAll(async () => {
    container = await new PostgreSqlContainer()
      .withDatabase('test')
      .withUsername('test')
      .withPassword('test')
      .withExposedPorts({
        container: 5432,
        host: 5433,
      })
      .start();

    prismaClient = new PrismaClient({
      datasourceUrl: container.getConnectionUri(),
    });

    await asyncExec(
      `DATABASE_URL=${container.getConnectionUri()} npm run prisma:migrate:deploy`,
    );

    await prismaClient.$connect();
  });

  afterAll(async () => {
    await container.stop({ timeout: 1000 });
    await prismaClient.$disconnect();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaClient)
      .compile();

    app = moduleFixture.createNestApplication();
    userRepositoryPrisma = app.get<UserRepositoryPrisma>(UserRepositoryPrisma);
    await app.init();
    await prismaClient.user.deleteMany();
    await prismaClient.$executeRawUnsafe('TRUNCATE table "User" CASCADE');
  });

  it('/api/user/ (POST)', async () => {
    const users = await userRepositoryPrisma.getAll();
    expect(users).toStrictEqual([]);

    await request(app.getHttpServer())
      .post('/api/user/')
      .send({ email: 'user@gmail.com', password: 'password' })
      .expect(201);

    const exist = await userRepositoryPrisma.emailExist('user@gmail.com');
    expect(exist).toBe(true);
  });

  it('/api/user/1 (PUT)', async () => {
    const user = userBuilder()
      .withEmail('user@gmail.com')
      .withPassword('password');
    const createdUser = await userRepositoryPrisma.create(user.build());

    await request(app.getHttpServer())
      .put(`/api/user/${createdUser.id}`)
      .send({ email: 'user2@gmail.com', password: 'password2' })
      .expect(200);

    const updatedUser = await userRepositoryPrisma.findById(createdUser.id);
    expect(updatedUser).toEqual(
      user
        .withId(createdUser.id)
        .withEmail('user2@gmail.com')
        .withPassword('password2')
        .build(),
    );
  });
});
