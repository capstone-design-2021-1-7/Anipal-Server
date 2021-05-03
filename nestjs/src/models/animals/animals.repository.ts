import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';

@Injectable()
export class AnimalsRepository {
  constructor(
    @InjectModel(Animal.name)
    private animalModel: mongoose.Model<AnimalDocument>,
  ) {}

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async find(_id: mongoose.Types.ObjectId): Promise<Animal> {
    return this.animalModel.findOne(_id).exec();
  }

  async findBasic(): Promise<Animal[]> {
    return this.animalModel.find({ is_basic: true }).exec();
  }
}
