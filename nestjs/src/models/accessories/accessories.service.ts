import { Injectable } from '@nestjs/common';
import { AccessoriesRepository } from './accessories.repository';
import { Accessory } from './schemas/accessory.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class AccessoriesService {
  constructor(private readonly accessoriesRepository: AccessoriesRepository) {}

  async findAll(category = null): Promise<Accessory[]> {
    return this.accessoriesRepository.findAll(category);
  }

  async find(_id: mongoose.Types.ObjectId): Promise<Accessory> {
    return this.accessoriesRepository.find(_id);
  }
}
