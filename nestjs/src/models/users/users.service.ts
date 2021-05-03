import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async find(_id: mongoose.Types.ObjectId): Promise<User> {
    const user: User = await this.usersRepository.find(_id);
    if (!user) {
      throw new NotFoundException({
        detail: `${_id}에 해당하는 유저가 존재하지 않습니다.`,
      });
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException({
        detail: `${email}을 가진 유저가 존재하지 않습니다.`,
      });
    }
    return user;
  }

  async findOwnAnimals(userId: mongoose.Types.ObjectId): Promise<User> {
    return this.usersRepository.findOwnAnimals(userId);
  }

  async findClosestUsers(user: User): Promise<User[]> {
    const users = await this.usersRepository.findAll(user._id);
    const closetUsers = users
      .filter(
        (other) =>
          user.languages.filter((language) =>
            other.languages
              .map((otherLanguage) => otherLanguage.name)
              .includes(language.name),
          ).length > 0,
      )
      .map((other) => {
        return {
          count: user.favorites.filter((favorite) =>
            other.favorites.includes(favorite),
          ).length,
          user: other,
        };
      });
    closetUsers.sort((a, b) => {
      return a.count > b.count ? -1 : a.count < b.count ? 1 : 0;
    });
    return closetUsers.map((user) => user.user);
  }
}
