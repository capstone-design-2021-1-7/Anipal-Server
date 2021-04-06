import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async save(user: CreateUserDto): Promise<User> {
    if (await this.findByEmail(user.email)) {
      throw new BadRequestException({
        detail: `${user.email}을 가진 유저가 이미 존재합니다.`,
      });
    }
    return await this.usersRepository.save(user);
  }

  async update(
    _id: mongoose.Types.ObjectId,
    user: UpdateUserDto,
  ): Promise<User> {
    if (!(await this.find(_id))) {
      throw new BadRequestException({
        detail: `${_id}에 해당하는 유저가 존재하지 않습니다.`,
      });
    }
    return await this.usersRepository.update(_id, user);
  }
}
