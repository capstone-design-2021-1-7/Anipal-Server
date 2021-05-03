import { Injectable } from '@nestjs/common';
import { AnimalsRepository } from './animals.repository';
import { Animal } from './schemas/animal.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class AnimalsService {
  constructor(private readonly animalsRepository: AnimalsRepository) {}

  async findAll(): Promise<Animal[]> {
    return this.animalsRepository.findAll();
  }

  async find(_id: mongoose.Types.ObjectId): Promise<Animal> {
    return this.animalsRepository.find(_id);
  }

  async findBasic(): Promise<Animal[]> {
    return this.animalsRepository.findBasic();
  }
}
