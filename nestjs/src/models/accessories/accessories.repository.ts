import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Accessory, AccessoryDocument } from './schemas/accessory.schema';

@Injectable()
export class AccessoriesRepository {
  constructor(
    @InjectModel(Accessory.name)
    private accessoryModel: mongoose.Model<AccessoryDocument>,
  ) {}

  async findAll(category = null): Promise<Accessory[]> {
    return this.accessoryModel.find(category ? { category } : {}).exec();
  }

  async find(_id: mongoose.Types.ObjectId): Promise<Accessory> {
    return this.accessoryModel.findOne(_id).exec();
  }
}
