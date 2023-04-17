import { Repository } from 'typeorm';

import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthController } from '../src/infrastructure/controller/auth.controller';
import { AuthService } from '../src/infrastructure/service/auth.service';

import { UserLoginInfoEntity } from '../src/infrastructure/entities/user.entity';

describe('Auth controller (e2e)', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersRepository: Repository<UserLoginInfoEntity>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserLoginInfoEntity);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
    usersRepository = moduleRef.get<Repository<UserLoginInfoEntity>>(
      USER_REPOSITORY_TOKEN,
    );
  });

  it('sign in', async () => {
    const result = 'sign in';
    jest.spyOn(authService, 'signIn');
    expect(await authController.signIn()).toBe(result);
  });

  it('sign out', async () => {
    const result = 'sign out';
    jest.spyOn(authService, 'signOut');
    expect(await authController.signOut()).toBe(result);
  });

  it('expect user repo to be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  it('find all users', async () => {
    const users = [{ name: 'Alni', id: '123' }];
    jest.spyOn(authService, 'findAll');
    expect(await authController.findAll()).toBe(users);
  });
});
