import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';
import { OwnAnimal } from './schemas/own-animal.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Accessory } from '../accessories/schemas/accessory.schema';

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
    return this.userModel.findById(_id).populate('own_animals_id').exec();
  }

  async findAllExceptBannedUser(
    me: mongoose.Types.ObjectId,
    banned_users_id: mongoose.Types.ObjectId[],
  ) {
    return this.userModel.find({
      $and: [{ _id: { $ne: me } }, { _id: { $nin: banned_users_id } }],
    });
  }

  async findOwnAnimals(userId: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel
      .findById(userId, 'own_animals_id')
      .populate('own_animals_id')
      .exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel
      .findOne({ email })
      .populate('own_animals_id', 'animal.localized')
      .populate('own_accessories.head.accessory_id')
      .populate('own_accessories.gloves.accessory_id')
      .populate('own_accessories.shoes.accessory_id')
      .populate('own_accessories.pants.accessory_id')
      .populate('own_accessories.top.accessory_id')
      .exec();
  }

  async save(user: CreateUserDto, ownAnimals: OwnAnimal[]): Promise<User> {
    const createdUser = new this.userModel(user);
    createdUser.own_animals_id = ownAnimals;
    const favorite_animal = ownAnimals.find(
      (ownAnimal) => ownAnimal.is_favorite,
    );
    createdUser.favorite_animal = {
      animal_url: favorite_animal.animal_url,
    };
    return createdUser.save();
  }

  async update(
    _id: mongoose.Types.ObjectId,
    user: UpdateUserDto,
  ): Promise<User> {
    await this.userModel.findOneAndUpdate({ _id }, user).exec();
    return this.find(_id);
  }

  async updateFavoriteAnimal(
    userId: mongoose.Types.ObjectId,
    updateOwnAnimal: OwnAnimal,
  ) {
    await this.userModel.findByIdAndUpdate(userId, {
      favorite_animal: {
        animal_url: updateOwnAnimal.animal_url,
        head_url: updateOwnAnimal.head_url,
        top_url: updateOwnAnimal.top_url,
        pants_url: updateOwnAnimal.pants_url,
        gloves_url: updateOwnAnimal.gloves_url,
        shoes_url: updateOwnAnimal.shoes_url,
      },
    });
  }

  async getAccessory(userId: mongoose.Types.ObjectId, accessory: Accessory) {
    switch (accessory.category) {
      case 'head':
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              'own_accessories.head': {
                accessory_id: accessory,
                img_url: accessory.img_url,
              },
            },
          },
        );
        break;
      case 'gloves':
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              'own_accessories.gloves': {
                accessory_id: accessory,
                img_url: accessory.img_url,
              },
            },
          },
        );
        break;
      case 'pants':
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              'own_accessories.pants': {
                accessory_id: accessory,
                img_url: accessory.img_url,
              },
            },
          },
        );
        break;
      case 'top':
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              'own_accessories.top': {
                accessory_id: accessory,
                img_url: accessory.img_url,
              },
            },
          },
        );
        break;
      case 'shoes':
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              'own_accessories.shoes': {
                accessory_id: accessory,
                img_url: accessory.img_url,
              },
            },
          },
        );
        break;
    }
  }

  async banUser(
    userId: mongoose.Types.ObjectId,
    bannedUserId: mongoose.Types.ObjectId,
  ) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { banned_users_id: bannedUserId } },
    );
  }

  async cancelBanUser(
    userId: mongoose.Types.ObjectId,
    bannedUserId: mongoose.Types.ObjectId,
  ) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { banned_users_id: bannedUserId } },
    );
  }
}
