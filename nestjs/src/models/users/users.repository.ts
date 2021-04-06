import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async find(_id: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async save(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(
    _id: mongoose.Types.ObjectId,
    user: UpdateUserDto,
  ): Promise<User> {
    await this.userModel.findOneAndUpdate({ _id }, user).exec();
    const updatedUser = this.find(_id);
    return updatedUser;
  }
}
