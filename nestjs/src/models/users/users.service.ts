import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { OwnAnimal } from './schemas/own-animal.schema';
import { OwnAnimalsRepository } from './own-animals.repository';
import { MailboxesRepository } from '../mailboxes/mailboxes.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly ownAnimalsRepository: OwnAnimalsRepository,
    private readonly mailboxesRepository: MailboxesRepository,
  ) {}

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

  async update(user: User, updatedUser: UpdateUserDto): Promise<User> {
    if (updatedUser.favorite_animal) {
      this.ownAnimalsRepository.changeFavoriteAnimal(
        updatedUser.favorite_animal.animal_url,
        user.favorite_animal.animal_url,
      );
    }
    return this.usersRepository.update(user._id, updatedUser);
  }

  async findClosestUsers(user: User): Promise<User[]> {
    const mailboxes = this.mailboxesRepository.findMailboxes(user._id);
    const users = await this.usersRepository.findAllExceptBannedUser(
      user._id,
      user.banned_users_id,
    );
    const communicatedUsers = (await mailboxes).map(
      (mailbox) =>
        mailbox.owner_users.find(
          (owner_user) => !owner_user.user_id.equals(user._id),
        ).user_id,
    );
    const closetUsers = users
      .filter(
        (other) =>
          user.languages.filter((language) =>
            other.languages
              .map((otherLanguage) => otherLanguage.name)
              .includes(language.name),
          ).length > 0,
      )
      .filter(
        (other) =>
          !communicatedUsers.find((communicatedUser) =>
            communicatedUser.equals(other._id),
          ),
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

  async updateFavoriteAnimal(
    userId: mongoose.Types.ObjectId,
    updateOwnAnimal: OwnAnimal,
  ) {
    this.usersRepository.updateFavoriteAnimal(userId, updateOwnAnimal);
  }

  async banUser(
    userId: mongoose.Types.ObjectId,
    bannedUserId: mongoose.Types.ObjectId,
  ) {
    this.usersRepository.banUser(userId, bannedUserId);
  }

  async cancelBanUser(
    userId: mongoose.Types.ObjectId,
    bannedUserId: mongoose.Types.ObjectId,
  ) {
    this.usersRepository.cancelBanUser(userId, bannedUserId);
  }
}
