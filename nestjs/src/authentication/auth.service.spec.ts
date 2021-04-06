import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Types } from 'mongoose';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { User } from '../models/users/schemas/user.schema';
import { UsersRepository } from '../models/users/users.repository';

const loginUser: LoginUserDto = {
  email: 'whddk4415@gmail.com',
  provider: 'google',
};

const registedUser: CreateUserDto = {
  name: 'User 1',
  age: 15,
  birthday: new Date('1996-09-23'),
  gender: 'male',
  email: 'whddk4415@gmail.com',
  favorites: ['sport', 'game'],
  languages: [{ name: 'Korean', level: 'Expert' }],
  concept: 'play',
  provider: 'google',
};

const user: User = {
  _id: Types.ObjectId('60680be281b87e19745e7f0a'),
  name: 'User 1',
  age: 15,
  birthday: new Date('1996-09-23'),
  gender: 'male',
  email: 'whddk4415@gmail.com',
  favorites: ['sport', 'game'],
  languages: [{ name: 'Korean', level: 'Expert' }],
  concept: 'play',
  provider: 'google',
  accessories: null,
  animals: null,
  created: new Date(),
};

describe('UsersController', () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useFactory: () => {},
        },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
    usersRepository = await module.get<UsersRepository>(UsersRepository);
  });

  describe('login', () => {
    it('로그인 성공', async () => {
      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockResolvedValue(Promise.resolve(user));
      const result = await authService.login(loginUser, 'google');

      expect(result).toEqual(user);
    });
  });
});
