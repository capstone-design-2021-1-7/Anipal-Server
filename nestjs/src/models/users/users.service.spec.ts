import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import * as mongoose from 'mongoose';

const user: User = {
  _id: mongoose.Types.ObjectId('60680be281b87e19745e7f0a'),
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

const users: User[] = [user];

describe('UsersController', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useFactory: () => {},
        },
      ],
    }).compile();

    usersService = await module.get<UsersService>(UsersService);
    usersRepository = await module.get<UsersRepository>(UsersRepository);
  });

  describe('findAll', () => {
    it('조회된 데이터는 Array 타입', async () => {
      jest
        .spyOn(usersRepository, 'findAll')
        .mockResolvedValue(Promise.resolve(users));
      const result = await usersService.findAll();

      expect(result).toBeInstanceOf(Array);
    });
    it(`should return ${[user]}`, async () => {
      jest
        .spyOn(usersRepository, 'findAll')
        .mockResolvedValue(Promise.resolve(users));
      const result = await usersService.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('find', () => {
    it(`should return ${user}`, async () => {
      jest
        .spyOn(usersRepository, 'find')
        .mockResolvedValue(Promise.resolve(user));
      const result = await usersService.find(user._id);

      expect(result).toEqual(user);
    });
  });
});
