import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';
import { Animal } from '../animals/schemas/animal.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<UserDocument>,
  ) {}

  async findAll(me?: mongoose.Types.ObjectId): Promise<User[]> {
    if (me) {
      return this.userModel.find({ _id: { $ne: me } });
    }
    return this.userModel.find().exec();
  }

  async find(_id: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async findOwnAnimals(userId: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel
      .findById(userId, 'own_animals_id')
      .populate('own_animals_id')
      .exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).populate('own_animals_id').exec();
  }

  async save(user: CreateUserDto, animals: Animal[]): Promise<User> {
    const createdUser = new this.userModel(user);
    createdUser.own_animals_id = animals.map((animal) => ({
      animal: {
        localized: animal.localized,
        delay_time: animal.delay_time,
      },
      delay_time: animal.delay_time,
      animal_url: animal.img_url,
      coming_animal: animal.coming_animal,
      is_favorite: user.favorite_animal == animal._id.toHexString(),
    }));
    return createdUser.save();
  }
}
